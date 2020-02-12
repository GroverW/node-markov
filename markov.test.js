const { MarkovMachine } = require("./markov");

describe("makeChains function", function () {
  let m;

  beforeEach(function() {
    m = new MarkovMachine("sample sample testing only");
  });

  test('confirm word array', function () {
    expect(m.words).toEqual(['sample', 'sample', 'testing', 'only']);
  });

  test('make chains', function () {
    expect(m.wordChains).toEqual({sample: ['sample', 'testing'], 
      testing: ['only'], only: [null]});
  });

  test('make text non-last word', function () {
    let words = m.makeText().split(' ');
    let randomIndex = Math.max(1, Math.floor(Math.random() * words.length - 1));
    expect(m.wordChains[words[randomIndex - 1]]).toContain(words[randomIndex]);
  });
  
  test('make text last word', function () {
    let words = m.makeText().split(' ');
    let index = words.length - 1;
    console.log(m.wordChains[words[index]]);
    expect(m.wordChains[words[index]]).toEqual([null]);
  });
});