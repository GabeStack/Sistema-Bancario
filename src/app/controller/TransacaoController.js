let {contas,depositos,saques,transferencias} = require("../database/bancodedados");
const { format } = require('date-fns');


const VerifyAccount = (numeroConta, contas) =>{
  const contaVerificada = contas.find((conta) => {
    return conta.numero === Number(numeroConta);
  });
  return contaVerificada;
};

const Deposit = (req, res) =>{
  try {
    const { numero_conta, valor } = req.body;
    const contaVerificacao = VerifyAccount(numero_conta, contas);
    const dataAtual = new Date();
    const data = format(dataAtual, "yyyy-MM-dd HH:mm:ss")
    const transacao = {
      data: data,
      numero_conta,
      valor,
    };

    if (!numero_conta || !valor) {
      return res
        .status(400)
        .json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }
    if (valor < 1) {
      return res
        .status(400)
        .json({ mensagem: "O Valor não pode ser negativo!" });
    }
    if (!contaVerificacao) {
      return res.status(404).json({ mensagem: "Conta não encontrada" });
    }
    contaVerificacao.saldo += valor;
    depositos.push(transacao);
    return res.status(204).json({});
  } catch (error) {
    return res.status(400).json(error);
  }
};

const Cash = (req, res) =>{
  try {
    const { numero_conta, valor, senha } = req.body;
    const contaVerificacao = VerifyAccount(numero_conta, contas);
    const dataAtual = new Date();
    const data = format(dataAtual, "yyyy-MM-dd HH:mm:ss")
    const transacao = {
      data:  data,
      numero_conta,
      valor,
    };
    if (!contaVerificacao) {
      return res.status(404).json({ mensagem: "Conta não encontrada" });
    }
    if (!numero_conta || !valor || !senha) {
      return res
        .status(400)
        .json({
          mensagem: "O número da conta, valor e senha são obrigatórios!",
        });
    }

    if (contaVerificacao.usuario.senha !== senha) {
      return res
        .status(401)
        .json({ mensagem: "A senha informada é inválida!" });
    }
    if (valor < 1) {
      return res
        .status(400)
        .json({ mensagem: "O Valor não pode ser negativo!" });
    }
    if (contaVerificacao.saldo < 1) {
      return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }
    contaVerificacao.saldo -= valor;
    saques.push(transacao);
    return res.status(204).json({});
  } catch (error) {
    return res.status(400).json(error);
  }
};

const Transfer = (req, res) =>{
  try {
    const { numero_conta_origem, numero_conta_destino, valor, senha } =
      req.body;
    const contaVerificacao_origem = VerifyAccount(numero_conta_origem, contas);
    const contaVerificacao_destino = VerifyAccount(numero_conta_destino,contas);
    const dataAtual = new Date();
    const data = format(dataAtual, "yyyy-MM-dd HH:mm:ss")
    const transacao = {
      data: data,
      numero_conta_origem,
      numero_conta_destino,
      valor,
    };
    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
      return res
        .status(400)
        .json({
          mensagem:
            "Os campos numero_conta_origem, numero_conta_destino, valor, senha são obrigatórios!",
        });
    }
    if (!contaVerificacao_origem) {
      return res
        .status(404)
        .json({ mensagem: "Conta de origem não encontrada!" });
    }
    if (!contaVerificacao_destino) {
      return res
        .status(404)
        .json({ mensagem: "Conta de destino não encontrada!" });
    }
    if (contaVerificacao_origem.usuario.senha !== senha) {
      return res
        .status(401)
        .json({ mensagem: "A senha informada é inválida!" });
    }
    if (valor < 1) {
      return res
        .status(400)
        .json({ mensagem: "O Valor não pode ser negativo!" });
    }
    if (contaVerificacao_origem.saldo < 1) {
      return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }

    contaVerificacao_origem.saldo -= valor;

    contaVerificacao_destino.saldo += valor;
    
    transferencias.push(transacao);
    return res.status(204).json({});
  } catch (error) {
    return res.status(400).json(error);
  }
};


module.exports = { Deposit, Cash, Transfer };
