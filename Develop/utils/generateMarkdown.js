// TODO: Create a function that returns a license badge based on which license is passed in

const license = require('license');
const writeToFile = require('./writeToFile');
// If there is no license, return an empty string
function renderLicenseBadge(github, repo) {
  return `
  ![GitHub](https://img.shields.io/github/license/${github}/${repo})
  `;
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(licenses, github) {
  const currentYear = new Date().getFullYear();
  const licenseFile = license.getLicense(licenses, {
    Author: github.toString(),
    date: currentYear.toString(),
  });

  writeToFile('./LICENSE', licenseFile);
}

// TODO: Create a function to generate markdown for README
const generateMarkdown = (data) => {
  console.log(data);
  const {
    github,
    repo,
    title,
    description,
    installation,
    usage,
    contributing,
    tests,
    licenses,
    email,
  } = data;
  renderLicenseLink(licenses, github);
  return `

  # ${title}
${renderLicenseBadge(github, repo)}
## Description

${description}

## table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## installation

\`\`\`
${installation}
\`\`\`

## usage
${usage}
 ${tests}
 ${contributing}
## license
${licenses}

## Questions

GitHub: ${github}

Email: ${email}
`;
};

module.exports = generateMarkdown;
