const shell = require('shelljs');
const path = require('path');
const colors = require('colors');

let newProject = {};

newProject.cmd = 'new <projectTemplate> [projectName]';
newProject.desc = 'create a new project with specific template';

newProject.action = function (projectTemplate,projectName){
  if (!projectName) {
    projectName = projectTemplate;
  }
  const templatePath = path.resolve(__dirname,'../templates',projectTemplate);

  const destPath = path.resolve(process.cwd(),projectName);

  if (shell.test('-e',destPath)) {
    console.log(`Directory ${projectName} already exists, please select a new folder.`.red);
    return;
  } else {
    shell.mkdir('-p',destPath);
  }

  if (shell.test('-e',templatePath)) {
    shell.cp('-r',path.resolve(templatePath,'./*'),destPath);
  } else {
    const code = shell.exec(`git clone https://github.com/yaoyasong/${projectTemplate} ${projectName}`);
    if (code !== 0) {
      console.log('created failed.'.red);
      return;
    }
  }
  console.log(`created project ${projectName} with template ${projectTemplate} successfully`.green);
};

module.exports = newProject;
