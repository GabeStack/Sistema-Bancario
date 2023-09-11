<div align="center" >
  
  # Sistema Bancario
<div>
  
[![GitHub stars](https://img.shields.io/github/stars/Cyacer/BookList.svg?style=social&label=Stars)](https://github.com/Cyacer/BookList)
[![PyPI license](https://img.shields.io/pypi/l/ansicolortags.svg)](https://pypi.python.org/pypi/ansicolortags/) 
  
</div>

  ### Este projeto foi desenvolvido em <img align="center" src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white" />, utilizando como banco de dados o armazenamento em memoria enquanto a aplicação estiver ativa, realizando assim as principais funções bancárias.
  
</div>
<div align="center" >

<h3>
  
 | Comando              | Descrição                |
 | -------------------- | ------------------------ |
  | `npm install`| Para instalar as bibliotecas  que seram utilizadas para iniciar a Api    |
 | `npm start`| Inicialização do Servidor     |
 
</h3> 
<h2 align="center">Rotas</h2>
<h3>
  
  
 | Metodo               | Caminho               |  Descrição               |
 | -------------------- | --------------------  | ------------------------ |
 | GET              |        `/contas?senha_banco=Cubos123Bank`       | Puxa todas as contas criado.|
 | GET              |        `/contas/saldo?numero_conta=123&senha=123`       | Puxa o saldo da conta com base no numero da conta.|
 | GET              |        `/contas/extrato?numero_conta=123&senha=123`       | Puxa puxar todas as transações com base no numero da conta.|
 | POST             |       `/contas`        | Cadastra conta. |
 | POST             |       `/transacoes/transferir`        | Transferir dinheiro. |
 | POST             |       `/transacoes/sacar`        | Sacar dinheiro. |
 | POST             |       `/transacoes/depositar`        | Depositar dinheiro. |
 | PUT              |       `/contas/:id`    | Alterar / Atualizar um ou mais dados especifico do usuário.|
 | DELETE           |       `/contas/:id`    | Exclui uma conta especifica.|
 
</h3> 
