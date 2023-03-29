// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./Develop/utils/generateMarkdown');
const writeToFile = require('./Develop/utils/writeToFile');
// TODO: Create an array of questions for user input
const promptQuestions = (portfolioData) => {
  if (!portfolioData) {
    portfolioData = [];
  }
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your GitHub Username!');
            return false;
          }
        },
      },
      {
        type: 'input',
        name: 'repo',
        message: 'Enter your GitHub Repo name (Required)',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please enter your GitHub Repo name!');
            return false;
          }
        },
      },
      {
        type: 'input',
        message: 'What is the title of your project?',
        name: 'title',
        default: 'Project Title',
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log('A valid project title is required.');
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log('Please provide a description?');
            return false;
          }
        },
      },
      {
        type: 'input',
        message:
          'If applicable, describe the steps required to install your project for the Installation section.',
        name: 'installation',
      },
      {
        type: 'input',
        message:
          'Provide instructions and examples of your project in use for the Usage section.',
        name: 'usage',
      },
      {
        type: 'input',
        message:
          'If applicable, provide guidelines on how other developers can contribute to your project.',
        name: 'contributing',
      },
      {
        type: 'input',
        message:
          'If applicable, provide any tests written for your application and provide examples on how to run them.',
        name: 'tests',
      },
      {
        type: 'input',
        message: 'Please provide a email if anyone has any question.',
        name: 'email',
      },
      {
        type: 'list',
        message: 'Choose a license for your project.',
        choices: [
          'GNU-AGPLv3',
          'GNU-GPLv3',
          'GNU-LGPLv3',
          'Mozilla-Public-2.0',
          'Apache-2.0',
          'MIT',
          'Boost Software 1.0',
          'The-Unlicense',
        ],
        name: 'licenses',
      },
    ])
    .then((projectData) => {
      portfolioData.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData[0];
      }
    });
};

promptQuestions()
  .then((portfolioData) => {
    return generateMarkdown(portfolioData);
  })
  .then((data) => {
    return writeToFile('./README.MD', data);
  });
