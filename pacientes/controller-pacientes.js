
const express = require('express');
const async = require('async');
const servicePacientes = require('./service-pacientes.js');
const router = express.Router();

// TEMP for Postman tests
const daoPacientes = require('./dao-pacientes.js');
router.get('/', async (req, res) => {
  let retorno = await daoPacientes.SelectPostman();
  res.send(retorno);
});
//////////////

router.post('/', async (req, res, next) => {
  switch (await servicePacientes.RuleInsertPaciente(req.body)) {
    case 0:
        return res.status(201).send();
    case 3:
        return res.status(406).send();
    case 5:
      return res.status(500).send();    
  }
});

router.get('/nome', async (req, res, next) => {
  let retorno = await servicePacientes.RuleSelectPacienteNome(req.query.nome);
  switch (retorno) {  
    case 2:
      return res.status(404).send({'':''});    
    case 3:
      return res.status(406).send({'':''});
    case 5:
      return res.status(500).send({'':''});
    default:
      return res.status(200).send(retorno);    
  }
});

router.get('/cpf', async (req, res, next) => {
  let retorno = await servicePacientes.RuleSelectPacienteCpf(req.query.cpf);
  switch (retorno) {  
    case 2:
      return res.status(404).send({'':''});    
    case 5:
      return res.status(500).send({'':''});
    default:
      return res.status(200).send(retorno);    
  }
});

router.get('/cns', async (req, res, next) => {
  let retorno = await servicePacientes.RuleSelectPacienteCns(req.query.cns);
  switch (retorno) {  
    case 2:
      return res.status(404).send({'':''});    
    case 5:
      return res.status(500).send({'':''});
    default:
      return res.status(200).send(retorno);    
  }
});

router.get('/registro', async (req, res, next) => {
  let retorno = await servicePacientes.RuleSelectPacienteRegistro(req.query.registro);
  switch (retorno) {  
    case 2:
      return res.status(404).send({'':''});    
    case 5:
      return res.status(500).send({'':''});
    default:
      return res.status(200).send(retorno);    
  }
});

router.put('/:id', async (req, res, next) => {
  let retorno = await servicePacientes.RuleUpdatePaciente(req.params.id,req.body);
  switch (retorno) {
    case 0:
        return res.status(200).send();
    case 2:
        return res.status(404).send();
    case 3:
        return res.status(406).send();
    case 5:
      return res.status(500).send();    
  }
});

module.exports = router;