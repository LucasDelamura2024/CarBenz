require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 5500,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/send-email', (req, res) => {
    const { to, subject, text, html } = req.body;

    let mailOptions = {
        from: '"CarBenz" <' + process.env.EMAIL_USER + '>',
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

app.listen(5500, () => {
    console.log('Servidor rodando na porta 5500');
});


function sendQuoteEmail(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    // Captura os dados do formulário de orçamento
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const category = document.getElementById('category').value;
    const vehicleModel = document.getElementById('vehicle-model').value;
    const serviceType = document.getElementById('quote-service-type').value;
    const details = document.getElementById('details').value;

    // Formata os dados para o e-mail
    const emailBody = `
        <p><b>Solicitação de Orçamento</b></p>
        <ul>
            <li><b>Nome:</b> ${name}</li>
            <li><b>Telefone:</b> ${phone}</li>
            <li><b>Categoria:</b> ${category}</li>
            <li><b>Modelo do Veículo:</b> ${vehicleModel}</li>
            <li><b>Tipo de Serviço:</b> ${serviceType}</li>
            <li><b>Detalhes:</b> ${details || 'Nenhum detalhe adicional'}</li>
        </ul>
        <p>Obrigado por entrar em contato com a CarBenz!</p>
    `;

    // Envia o e-mail
    fetch('http://localhost:3001/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            to: 'destinatario@exemplo.com', // Substitua pelo destinatário desejado
            cc: phone, // Coloque o e-mail do cliente em cópia (se disponível)
            subject: 'Orçamento Solicitado - CarBenz',
            text: `Orçamento solicitado por ${name}`,
            html: emailBody
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Orçamento enviado com sucesso!');
        } else {
            alert('Erro ao enviar o orçamento.');
            console.error('Erro detalhado:', response);
        }
    })
    .catch(error => {
        console.error('Erro ao tentar enviar o orçamento:', error);
        alert('Erro ao enviar o orçamento.');
    });
}
