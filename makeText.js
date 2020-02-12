/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov');
const fs = require('fs');
const axios = require('axios');

if(process.argv.indexOf('file') !== -1) {
  markovFromFile();
} else {
  markovFromURL();
}

function markovFromFile() {
  fs.readFile(process.argv[3], 'utf8', function (err, data) {
      if (err) {
        console.error(err);
        process.exit(1);
      };
      let m = new MarkovMachine(data);
      console.log(m.makeText());
  });
}

async function markovFromURL() {
  try {
    response = await axios.get(process.argv[3])

    let m = new MarkovMachine(response.data);
    console.log(m.makeText())
  } catch(error) {
    console.error(error);
    process.exit(1);
  }
  
}