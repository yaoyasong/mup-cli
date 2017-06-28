const template = require('art-template');
const path = require('path');
const fs = require('fs');

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
    lowerModelName: modelName.toLowerCase()
  };

  const destPath = path.resolve(process.cwd());

  //generate model
  let srcContent = compileFile('Model.java',options);
  fs.writeFileSync(destPath + `/${modelName}.java`,srcContent,{encoding: 'utf8'});

  //generate vo
  srcContent = compileFile('ModelVo.java',options);
  fs.writeFileSync(destPath + `/${modelName}Vo.java`,srcContent,{encoding: 'utf8'});

  //generate service
  srcContent = compileFile('IService.java',options);
  fs.writeFileSync(destPath + `/I${modelName}Service.java`,srcContent,{encoding: 'utf8'});
  srcContent = compileFile('Service.java',options);
  fs.writeFileSync(destPath + `/${modelName}Service.java`,srcContent,{encoding: 'utf8'});

  //generate dao
  srcContent = compileFile('DAO.java',options);
  fs.writeFileSync(destPath + `/${modelName}DAO.java`,srcContent,{encoding: 'utf8'});

  //generate controller
  srcContent = compileFile('Controller.java',options);
  fs.writeFileSync(destPath + `/${modelName}Controller.java`,srcContent,{encoding: 'utf8'});
};

function compileFile(templateFile, options) {
  return template(path.resolve(__dirname,`../templates/java-model/${templateFile}`),options);
}

module.exports = javaModel;