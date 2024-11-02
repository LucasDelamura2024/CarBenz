const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 5500;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração do nodemailer
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: '78delamura@gmail.com', // Substitua pelo seu e-mail
        pass: 'gvxdnvacvurdhjca' // Substitua pela sua senha de aplicativo
    }
});

app.post('/cadastro', (req, res) => {
    const { name, email, phone, cep, address, number, vehicleCategory, vehicleModel, datetime } = req.body;

    const newEntry = `
<cliente>
    <nome>${name}</nome>
    <email>${email}</email>
    <telefone>${phone}</telefone>
    <cep>${cep}</cep>
    <endereco>${address}</endereco>
    <numero>${number}</numero>
    <categoria>${vehicleCategory}</categoria>
    <modelo>${vehicleModel}</modelo>
    <dataHora>${datetime}</dataHora>
</cliente>`;

    fs.appendFile('Cliente.xml', newEntry, (err) => {
        if (err) {
            console.error('Erro ao gravar no arquivo:', err);
            return res.status(500).send('Erro ao gravar os dados.');
        }
        res.send('Cadastro realizado com sucesso!');
    });
});

app.post('/send-email', (req, res) => {
    const { to, subject, text, html } = req.body;

    let mailOptions = {
        from: '"CarBenz" <78delamura@gmail.com>',
        to: to,
        subject: subject,
        text: text,
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar e-mail:', error);
            return res.status(500).send('Erro ao enviar e-mail');
        }
        console.log('E-mail enviado:', info.response);
        res.send('E-mail enviado com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
