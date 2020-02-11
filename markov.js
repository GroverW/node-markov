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
    for(let word of this.words) {
      this.wordChains[word] = [];
      let start = this.words.indexOf(word);

      while(start !== -1 && start < this.words.length - 1) {
        this.wordChains[word].push(this.words[start + 1]);
        start = this.words.indexOf(word, start + 1);
      }

      if(this.wordChains[word].length === 0) this.wordChains[word].push(null)
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let currentIndex = Math.floor(Math.random() * this.words.length);
    let currentWord = this.words[currentIndex];
    let markovText = [currentWord];
    let n = 0;

    while(n < numWords - 1 && currentWord !== null) {
      currentIndex = Math.floor(Math.random() * this.wordChains[currentWord].length);
      let nextWord = this.wordChains[currentWord][currentIndex]
      markovText.push(nextWord);
      currentWord = nextWord;

      n++;
    }

    return markovText.join(' ');
  }
}
