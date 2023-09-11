let { contas} = require("../database/bancodedados");
const {saques, depositos, transferencias} = require("../database/bancodedados");

const VerifyAccount = (numeroConta, contas) => {
    const contaVerificada = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });
    return contaVerificada;
}

const Index = (req, res) =>{
    try{
    if(contas.length === 0){
        return res.status(404).json({ mensagem: 'Nenhuma conta bancária encontrada!' })
    } 
    res.status(200).json(contas);
} catch(error){
    return res.status(400).json(error);
}
}

const Store = (req, res) =>{
    try{
  const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
  const contaExistente = contas.find((conta) => conta.usuario.cpf === cpf || conta.usuario.email === email);
  let id = 1;
  if (contas.length > 0) {
    id = contas[contas.length - 1].numero + 1
}

  const novaConta = {
    numero:id ,
    saldo: 0,
    usuario: {
      nome,
      cpf,
      data_nascimento,
      telefone,
      email,
      senha,
    },
  };

  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }

  if (contaExistente) {
    return res
      .status(400)
      .json({ mensagem: "Já existe uma conta com o cpf ou e-mail informado!" });
  }
  

  contas.push(novaConta);

  res.status(204).json({});
} catch(error){
    return res.status(400).json(error)
}
}

const Update = (req, res) =>{
try{
const {numeroConta} = req.params;

const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

const contaVerificacao = VerifyAccount(numeroConta, contas)

  const cpfExistente = contas.find(
    (c) => c.numero !== numeroConta && c.usuario.cpf === cpf
  );

  const emailExistente = contas.find(
    (c) => c.numero !== numeroConta && c.usuario.email === email
  );


  if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
    return res
      .status(400)
      .json({ mensagem: "Todos os campos são obrigatórios" });
  }

  if (!contaVerificacao) {
    return res.status(404).json({ mensagem: "Conta não encontrada" });
  }

  if (cpfExistente || emailExistente) {
    return res
      .status(400)
      .json({ mensagem: "O CPF ou e-mail informados já estão cadastrados!" });
  }

  contaVerificacao.usuario.nome = nome;
  contaVerificacao.usuario.cpf = cpf;
  contaVerificacao.usuario.data_nascimento = data_nascimento;
  contaVerificacao.usuario.telefone = telefone;
  contaVerificacao.usuario.email = email;
  contaVerificacao.usuario.senha = senha;
  res.status(204).json({});
}catch(error){
    return res.status(400).json(error);
}
}

const Delete = (req, res) =>{
    try{
    const {numeroConta} = req.params;
    const contaVerificacao = VerifyAccount(numeroConta, contas)

    if (!contaVerificacao) {
        return res.status(404).json({ mensagem: "Conta não encontrada" });
      }

      if (contaVerificacao.saldo !== 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    })

    return res.status(204).json({})
    }catch(error){
        return res.status(400).json(error);
    }
}

const Balance = (req, res) =>{
  try{
  const { numero_conta, senha } = req.query;
  const contaVerificada = VerifyAccount( numero_conta, contas);
  if (!numero_conta || !senha) {
    return res.status(400).json({ mensagem: "O número da conta e senha são obrigatórios!" });
}
  if (!contaVerificada) {
    return res.status(400).json({ mensagem: "Não existe usuário cadastrado no número informado!" })
}
const saldo = contaVerificada.saldo;
  if(saldo < 1 ){
    return res.status(400).json({ mensagem: "Saldo insuficiente!" })
  }
  
  res.status(200).json({saldo});
}catch(error){
  return res.status(400).json(error);
}
}

const Extract = (req, res) =>{
  try {
    const { numero_conta, senha } = req.query;
    const contaVerificada = VerifyAccount( numero_conta, contas);

    if (!numero_conta || !senha) {
      return res.status(400).json({ mensagem: "O número da conta e senha são obrigatórios!" });
  }
  if (!contaVerificada) {
      return res.status(404).json({ mensagem: "Não existe usuário cadastrado no número informado!" })
  }
  if (contaVerificada.usuario.senha !== senha) {
      return res.status(400).json({ mensagem: "Senha digitada é inválida!" })
  }

    const extratoDepositoEfetuados = depositos.filter((item) =>{
      return item.numero_conta === numero_conta;
    })
    const extratoSaqueEfetuados = saques.filter((item) =>{
      return item.numero_conta === numero_conta;
    })
    const extratoTransferenciaEfetuados = transferencias.filter((item) =>{
      return item.numero_conta_origem === numero_conta;
    })
    const extratoTransferenciaEfetuadas = transferencias.filter((item) =>{
      return item.numero_conta_destino === numero_conta;
    })

    const extratoDaConta = {
      depositos: extratoDepositoEfetuados,
      saques: extratoSaqueEfetuados,
      transferencias: {
          enviadas: extratoTransferenciaEfetuados,
          recebidas: extratoTransferenciaEfetuadas,
      }
  }

  res.status(200).json({extratoDaConta});
  } catch (error) {
  return res.status(400).json(error);
  }
}

module.exports = {Index,Store,Update,Delete,Balance,Extract};
