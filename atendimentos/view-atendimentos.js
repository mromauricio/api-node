var async = require('async');
const fs = require('fs'); // ou require('fs').promises;

exports.ReadHtmlFile = async (htmlSearch) => {
  let retorno;
  if (htmlSearch == 'atendimentos'){
   try{ 
   retorno = await fs.promises.readFile('atendimentos/view-atendimentos.html');
   } catch (err) { console.log(err); retorno = 2;}
  }
  else if (htmlSearch == 'busca'){
    try{ 
      retorno = await fs.promises.readFile('atendimentos/view-search.html');
      } catch (err) { console.log(err); retorno = 2;}
  }
  else return 2;
  return retorno; 
}