var async = require('async');
const daoPacientes = require('./dao-pacientes.js');

exports.RuleInsertPaciente = async (data) => {
  data.nome = data.nome.toUpperCase();
  (data.menor)? data.menor = 1 : data.menor = 0;
  (data.whatsapp)? data.whatsapp = 1 : data.whatsapp = 0;
  if (data.nascimento.length!=0){ 
  let dataTemp = data.nascimento.split('/');
  data.nascimento = `'${dataTemp[2]}-${dataTemp[0]}-${dataTemp[1]}'`;
  }
  else data.nascimento = null;
  if (data.cpf==data.cpfresp) return 2; // Regra que obriga CPF ser diferente do CPF resp
  if (await daoPacientes.InsertPaciente(data) == 0) return 0;
  return 1;
}

exports.RuleSelectPacienteNome = async (query) => {
  query = query.toUpperCase();
  if (query == '') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await daoPacientes.SelectPacienteNome(query)
  if (retorno == '') return 3;
  if (retorno == 1) return 1;
  return retorno;
}

exports.RuleUpdatePaciente = async (idSearch,data) => {
  idSearch = idSearch.replace('id','');
  if (data.cpf==data.cpfresp) return 2; // Regra que obriga CPF ser diferente do CPF resp
  data.nome = data.nome.toUpperCase();
  (data.menor)? data.menor = 1 : data.menor = 0;
  (data.whatsapp)? data.whatsapp = 1 : data.whatsapp = 0;
  if (data.nascimento.length!=0) {
    if (data.nascimento.length <= 10) {
      let dataTemp = data.nascimento.split('/');
      data.nascimento = `'${dataTemp[2]}-${dataTemp[0]}-${dataTemp[1]}'`;
    }
    else data.nascimento = `'${data.nascimento.substring(0,10)}'`;
  }
  else data.nascimento = null;
  let retorno = await daoPacientes.UpdatePaciente(idSearch,data);
  if (retorno == 0) return 0;
  return 1
}


exports.RuleSelectPacienteCpf = async (query) => {
  if (query=='000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await daoPacientes.SelectPacienteCpf(query)
  if (retorno=='') return 3;
  if (retorno==1) return 1;
  return retorno;
}

exports.RuleSelectPacienteCns = async (query) => {
  if (query=='000.0000.0000.0000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await daoPacientes.SelectPacienteCns(query)
  if (retorno=='') return 3;
  if (retorno==1) return 1;
  return retorno;
}

exports.RuleSelectPacienteRegistro = async (query) => {
  if (query=='0.000.000') return 2;   // Teste fictício de validação da regra de negócio para provocar return 2 
  let retorno = await daoPacientes.SelectPacienteRegistro(query)
  if (retorno=='') return 3;
  if (retorno==1) return 1;
  return retorno;
}