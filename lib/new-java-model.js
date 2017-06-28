const template = require('art-template');
const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

const stringUtils = require('./string-utils');

let javaModel = {};

javaModel.cmd = 'javaModel <modelName> [packageName]';
javaModel.alias = 'jm';
javaModel.desc = 'create java sources';

javaModel.action = function (modelName,packageName){
  if (!packageName) {
    packageName = 'com.demo';
  }

  let options = {
    packageName: packageName,
    modelName: modelName,
    lowerModelName: stringUtils.firstLowerCase(modelName)
  };

  const destPath = path.resolve(process.cwd(),packageName.replace('.','/'));

  //generate model
  const modelPath = destPath + "/model";
  shell.mkdir('-p',modelPath);

  let srcContent = compileFile('Model.java',options);
  fs.writeFileSync(modelPath + `/${modelName}.java`,srcContent,{encoding: 'utf8'});

  //generate vo
  srcContent = compileFile('ModelVo.java',options);
  fs.writeFileSync(modelPath + `/${modelName}Vo.java`,srcContent,{encoding: 'utf8'});

  //generate service
  const servicePath = destPath + "/service";
  shell.mkdir('-p',servicePath);

  srcContent = compileFile('IService.java',options);
  fs.writeFileSync(servicePath + `/I${modelName}Service.java`,srcContent,{encoding: 'utf8'});
  srcContent = compileFile('Service.java',options);
  fs.writeFileSync(servicePath + `/${modelName}Service.java`,srcContent,{encoding: 'utf8'});

  //generate dao
  const daoPath = destPath + "/persistence";
  shell.mkdir('-p',daoPath);

  srcContent = compileFile('DAO.java',options);
  fs.writeFileSync(daoPath + `/${modelName}DAO.java`,srcContent,{encoding: 'utf8'});

  //generate controller
  const controllerPath = destPath + "/controller";
  shell.mkdir('-p',controllerPath);

  srcContent = compileFile('Controller.java',options);
  fs.writeFileSync(controllerPath + `/${modelName}Controller.java`,srcContent,{encoding: 'utf8'});
};

function compileFile(templateFile, options) {
  return template(path.resolve(__dirname,`../templates/java-model/${templateFile}`),options);
}

module.exports = javaModel;