<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:template match="/">
        <html>
            <head>
                <title>Cadastro de Clientes</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        border: 1px solid #ddd;
                        padding: 8px;
                    }
                    th {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                <h2>Lista de Clientes</h2>
                <table>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>CEP</th>
                        <th>Endereço</th>
                        <th>Número</th>
                        <th>Categoria do Veículo</th>
                        <th>Modelo do Veículo</th>
                        <th>Data e Hora</th>
                    </tr>
                    <xsl:for-each select="clientes/cliente">
                        <tr>
                            <td><xsl:value-of select="nome"/></td>
                            <td><xsl:value-of select="email"/></td>
                            <td><xsl:value-of select="telefone"/></td>
                            <td><xsl:value-of select="cep"/></td>
                            <td><xsl:value-of select="endereco"/></td>
                            <td><xsl:value-of select="numero"/></td>
                            <td><xsl:value-of select="categoria"/></td>
                            <td><xsl:value-of select="modelo"/></td>
                            <td><xsl:value-of select="dataHora"/></td>
                        </tr>
                    </xsl:for-each>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
