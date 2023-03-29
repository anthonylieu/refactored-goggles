const fs = require('fs');

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      return console.log(err);
    }

    console.log('Success! Your README.md file has been generated');
  });
}
module.exports = writeToFile;
