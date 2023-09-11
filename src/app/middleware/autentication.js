const {banco} = require('../database/bancodedados'); 

function CheckBankPassword(req, res, next) {
  const senhaBancoInformada = req.query.senha_banco;

  if (!senhaBancoInformada) {
    return res.status(400).json({ mensagem: 'A senha do banco deve ser informada!' });
  }

  if (senhaBancoInformada !== banco.senha) {
    return res.status(401).json({ mensagem: 'A senha do banco informada é inválida!' });
  }
  next();
}

module.exports = {
  CheckBankPassword,
};