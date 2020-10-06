var async = require('async');
const daoPacientes = require('./dao-pacientes.js');

exports.RuleInsertPaciente = async (data) => {
  data.nome = data.nome.toUpperCase();
  (data.menor)? data.menor = 1 : data.menor = 0;
  (data.whatsapp)? data.whatsapp = 1 : data.whatsapp = 0;
  (data.ativo)? data.ativo = 1 : data.ativo = 0;
  if (data.nascimento.length!=0){ 
  let dataTemp = data.nascimento.split('/');
  data.nascimento = `'${dataTemp[2]}-${dataTemp[0]}-${dataTemp[1]}'`;
  }
  else data.nascimento = null;
  if (data.cpf == data.cpfresp) return 3; // Regra que obriga CPF ser diferente do CPF resp
  if (data.cpf.length==0)  data.cpf = null
  else data.cpf =`'${data.cpf}'`
  if (data.cns.length==0)  data.cns = null
  else data.cns =`'${data.cns}'`
  if (data.registro.length==0)  data.registro = null
  else data.registro =`'${data.registro}'`
  if (await daoPacientes.InsertPaciente(data) == 0) return 0;
  return 5;
}

exports.RuleSelectPacienteNome = async (query) => {
  query = query.toUpperCase();
  if (query == '') return 3;   // Teste fictício de validação da regra de negócio 
  let retorno = await daoPacientes.SelectPacienteNome(query)
  if (retorno == '') return 2;
  if (retorno == 5) return 5;
  return retorno;
}

exports.RuleUpdatePaciente = async (idSearch,data) => {
  idSearch = idSearch.replace('id','');
  if (data.cpf==data.cpfresp) return 3; // Regra que obriga CPF ser diferente do CPF resp
  data.nome = data.nome.toUpperCase();
  (data.menor)? data.menor = 1 : data.menor = 0;
  (data.whatsapp)? data.whatsapp = 1 : data.whatsapp = 0;
  (data.ativo)? data.ativo = 1 : data.ativo = 0;
  if (data.nascimento.length!=0) {
    if (data.nascimento.length <= 10) {
      let dataTemp = data.nascimento.split('/');
      data.nascimento = `'${dataTemp[2]}-${dataTemp[0]}-${dataTemp[1]}'`;
    }
    else data.nascimento = `'${data.nascimento.substring(0,10)}'`;
  }
  else data.nascimento = null;
  if (data.cpf.length==0)  data.cpf = null
  else data.cpf =`'${data.cpf}'`
  if (data.cns.length==0)  data.cns = null
  else data.cns =`'${data.cns}'`
  if (data.registro.length==0)  data.registro = null
  else data.registro =`'${data.registro}'`
  let retorno = await daoPacientes.UpdatePaciente(idSearch,data);
  if (retorno == 0) return 0;
  if (retorno == 2) return 2;
  return 5
}


exports.RuleSelectPacienteCpf = async (query) => {
  let retorno = await daoPacientes.SelectPacienteCpf(query)
  if (retorno=='') return 2;
  if (retorno==5) return 5;
  return retorno;
}

exports.RuleSelectPacienteCns = async (query) => {
  let retorno = await daoPacientes.SelectPacienteCns(query)
  if (retorno=='') return 2;
  if (retorno==5) return 5;
  return retorno;
}

exports.RuleSelectPacienteRegistro = async (query) => {
  let retorno = await daoPacientes.SelectPacienteRegistro(query)
  if (retorno=='') return 2;
  if (retorno==5) return 5;
  return retorno;
}