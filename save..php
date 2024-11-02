<?php
// save.php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nome = $_POST['nome'];
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $cep = $_POST['cep'];
    $endereco = $_POST['endereco'];
    $numero = $_POST['numero'];
    $categoria = $_POST['categoria'];
    $modelo = $_POST['modelo'];
    $dataHora = $_POST['dataHora'];

    $xml = new SimpleXMLElement('Cliente.xml', null, true);
    $cliente = $xml->addChild('cliente');
    $cliente->addChild('nome', $nome);
    $cliente->addChild('email', $email);
    $cliente->addChild('telefone', $telefone);
    $cliente->addChild('cep', $cep);
    $cliente->addChild('endereco', $endereco);
    $cliente->addChild('numero', $numero);
    $cliente->addChild('categoria', $categoria);
    $cliente->addChild('modelo', $modelo);
    $cliente->addChild('dataHora', $dataHora);

    $xml->asXML('Cliente.xml');
    echo 'Cadastro realizado com sucesso!';
}
?>
