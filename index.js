const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

// Create writeFile function
const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of your project?',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a short description explaining the what, why and how of your project.',
    },
    {
      type: 'input',
      name: 'installation',
      message: 'What are the steps required to install your project?',
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples for use.',
    },
    {
      type: 'input',
      name: 'contributing',
      message: 'List any collaborators, with links to their GitHub profiles. List any third-party assets used and any tutorials you followed.',
    },
    {
      type: 'input',
      name: 'tests',
      message: 'List any instructions for running tests for your project.',
    },
    {
      type: 'list',
      name: 'license',
      message: 'Choose a license in order to let other developers know what they can and cannot do with your project. Refer to (https://choosealicense.com/) if you need help choosing a license.',
      choices: ['email', 'phone', 'telekinesis'],
    },  
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub username.',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email address.',
    },
  ]);
};

const generateReadme = (answers) =>
  `
  ## Title

  ${answers.title}

  ## Description

  ${answers.description}

  ## Table of Contents

  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Questions](#questions)
  
  ## Installation

  ${answers.installation}

  ## Usage

  ${answers.usage}

  ## Contributing

  ${answers.contributing}

  ## License

  ${answers.license}

  ## Questions

  If you have any questions, please contact me at https://github.com/${answers.github} or ${answers.email}.
 `;

// Write file 
const init = () => {
  promptUser()
    .then((answers) => writeFileAsync('README.md', generateReadme(answers)))
    .then(() => console.log('Successfully wrote to README.md'))
    .catch((err) => console.error(err));
};

init();
