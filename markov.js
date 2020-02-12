/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.wordChains = {};
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */
  
  makeChains() {
    for(let i = 0; i < this.words.length; i++) {
      if(!this.wordChains[this.words[i]]) this.wordChains[this.words[i]] = [];
      this.wordChains[this.words[i]].push(this.words[i + 1] || null);
    };
  };

  /** return random text from chains */

  makeText(numWords = 100) {
    let currentIndex = Math.floor(Math.random() * this.words.length);
    let currentWord = this.words[currentIndex];
    let markovText = [];
    let nextWord;

    while(markovText.length < numWords - 1 && currentWord !== null) {
      currentIndex = Math.floor(Math.random() * this.wordChains[currentWord].length);
      nextWord = this.wordChains[currentWord][currentIndex];
      markovText.push(currentWord);
      currentWord = nextWord;
    };
    return markovText.join(' ');
  };
};

module.exports = {MarkovMachine};
