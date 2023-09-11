const express = require('express');
const router = express.Router();
const  {Index,Store,Update,Delete,Balance,Extract} = require('./app/controller/ContaController');
const {Deposit,Cash,Transfer} = require('./app/controller/TransacaoController');
const {CheckBankPassword} = require('./app/middleware/autentication');

// Rotas Conta / usuario

  router.get('/contas',CheckBankPassword,Index);
  router.post('/contas',Store );
  router.put('/contas/:numeroConta/usuario',Update);
  router.delete('/contas/:numeroConta',Delete)

// Rotas Saldo/Extrato

router.get('/contas/saldo',Balance);
router.get('/contas/extrato',Extract);

// Rotas Transações

  router.post('/transacoes/depositar',Deposit );
  router.post('/transacoes/sacar',Cash);
  router.post('/transacoes/transferir',Transfer);


module.exports = router;