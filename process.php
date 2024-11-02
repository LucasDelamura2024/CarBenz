<?php
require 'vendor/autoload.php'; // Carrega o autoload do Composer

// Carregar variáveis do arquivo .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

try {
    // Conectar ao banco de dados usando variáveis de ambiente
    $conn = new PDO(
        "mysql:host={$_ENV['DB_HOST']};dbname={$_ENV['DB_NAME']};port={$_ENV['DB_PORT']}",
        $_ENV['DB_USER'],
        $_ENV['DB_PASSWORD'],
        [
            PDO::MYSQL_ATTR_SSL_CA => $_ENV['MYSQL_ATTR_SSL_CA'],
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

    // Receber os dados do formulário em JSON
    $data = json_decode(file_get_contents("php://input"), true);

    // Defina os dados do formulário nas variáveis
    $nome = $data['client-name'];
    $email = $data['client-email'];
    $telefone = $data['client-phone'];
    $cep = $data['client-cep'];
    $endereco = $data['client-address'];
    $numero = $data['client-number'];
    $categoria_veiculo = $data['vehicle-category'];
    $modelo_veiculo = $data['vehicle-model'];
    $data_hora = $data['data_hora'];
    $observacoes = $data['observacoes'];

    // Prepare e execute a consulta
    $sql = "INSERT INTO Clientes (nome, email, telefone, cep, endereco, numero, categoria_veiculo, modelo_veiculo, data_hora, observacoes) 
            VALUES (:nome, :email, :telefone, :cep, :endereco, :numero, :categoria_veiculo, :modelo_veiculo, :data_hora, :observacoes)";
    $stmt = $conn->prepare($sql);

    // Bind dos parâmetros
    $stmt->bindParam(':nome', $nome);
    $stmt->bindParam(':email', $email);
    $stmt->bindParam(':telefone', $telefone);
    $stmt->bindParam(':cep', $cep);
    $stmt->bindParam(':endereco', $endereco);
    $stmt->bindParam(':numero', $numero);
    $stmt->bindParam(':categoria_veiculo', $categoria_veiculo);
    $stmt->bindParam(':modelo_veiculo', $modelo_veiculo);
    $stmt->bindParam(':data_hora', $data_hora);
    $stmt->bindParam(':observacoes', $observacoes);

    if ($stmt->execute()) {
        // Enviar o e-mail com os dados do cadastro
        $to = "78delamura@gmail.com";
        $subject = "Novo Cadastro de Cliente";
        $message = "
            <html>
            <head>
                <title>Novo Cadastro de Cliente</title>
            </head>
            <body>
                <h2>Dados do Cliente:</h2>
                <p><strong>Nome:</strong> {$nome}</p>
                <p><strong>E-mail:</strong> {$email}</p>
                <p><strong>Telefone:</strong> {$telefone}</p>
                <p><strong>CEP:</strong> {$cep}</p>
                <p><strong>Endereço:</strong> {$endereco}</p>
                <p><strong>Número:</strong> {$numero}</p>
                <p><strong>Categoria do Veículo:</strong> {$categoria_veiculo}</p>
                <p><strong>Modelo do Veículo:</strong> {$modelo_veiculo}</p>
                <p><strong>Data e Hora:</strong> {$data_hora}</p>
                <p><strong>Observações:</strong> {$observacoes}</p>
            </body>
            </html>
        ";

        // Configurações do cabeçalho do e-mail
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= "From: no-reply@seudominio.com" . "\r\n";

        // Enviar o e-mail
        mail($to, $subject, $message, $headers);

        echo json_encode(["status" => "success", "message" => "Cadastro realizado com sucesso e e-mail enviado!"]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao cadastrar."]);
    }

} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Erro na conexão: " . $e->getMessage()]);
}
?>
