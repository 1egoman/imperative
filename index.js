/**
  imperative/index.js (https://github.com/1egoman/que)
  This file is concerned with parsing user commands.
*/

// dependencies
var _ = require("underscore"),
    fs = require("fs"),
    S = require('string');

var wV = require("./wordValidator");
var objectFragment = require("./objectFragment");

// turn an array like ['element'] into 'element'
// while keeping ['element', 'element2'] the same.
var condense = function(array) {
  return array.length == 1 ? array[0] : array;
}


// top level class
var phrase = function(textual) {

  // set class globals
  this.snt = textual;
  var self = this;

  // get verb identifiers
  var IDENT = require("./config/verb_identifiers.js").isVerbIf;

  // Split up a sentence into its general parts:
  // subject (most likely you),
  // verb, and
  // object
  this.getParts = function() {
    var parts = [];
    var words = this.getWords();

    // get the most likely verb (aka highest probability)
    var mostLikelyVerb = _.max(this.rateVerbs(), function(i) {
      return i.prob;
    });

    // is there even a verb in the sentence?
    if (mostLikelyVerb.prob === 0)
        mostLikelyVerb = {
          word: undefined,
          prob: 0,
          possibles: {}
        }

    // get our new verb's index, and from that determine subject and object
    index = words.indexOf(mostLikelyVerb.word);

    // in our case, a subject is defined as everything before the verb
    // for now, we don't really care about it, acctully
    // subject = words.slice(0, index);

    // likewise, an object is defined as everything after the verb
    object = words.slice(index+1);
    obj = new objectFragment(object);

    return {
      verb: mostLikelyVerb,
      object: condense( obj.getRequested() )
    };
  }

  /*
  where is the verb in the sentence?
  We are looking through each word in the sentence
  and ranking them from least likely to most likely
  */
  this.rateVerbs = function() {

    var allWords = this.getWords();

    // create data structure
    var words = _.map(allWords, function(w) {
      return {
        word: w,
        prob: 0,
        possibles: {
          tenses: [],
          meanings: []
        }
      }
    });

    // for each word
    _.each(words, function(word, index) {

      // look through patterns
      _.each(IDENT, function(identifier) {

        // the tests: this is where the probability is ranked
        if ( wV.validateFilter(allWords, index, identifier) ) {
          // increment probability
          word.prob += identifier.then.weight || 1;
          identifier.then.tense && word.possibles.tenses.push(identifier.then.tense);
          identifier.then.means && word.possibles.meanings.push(identifier.then.means);
        }

      });



    });

    return words;
  }

  // remove punctuation
  this.dePunctuate = function() {
    _.each(['.', '!', '?'], function(a) {
      if ( S(self.snt).endsWith(a) )
        self.snt = self.snt.replace(a, '');
    });
  }

  /*
    split up sentence into words
  */
  this.getWords = function() {
    self.dePunctuate()
    return self.snt.split(' ');
  }

}

var tests = function(){

  // test phrases
  PHR = [
    "what is the time in london?",
    "time in london",
    "get me a beer"
  ]

  // test each one
  _.each(PHR, function(t) {
    console.log("========================", "\nphrase:", t);
    p = new phrase(t);
    pts = p.getParts();
    console.log(pts.verb)
    console.log(pts.object)
  });
  console.log("========================");

}

if (require.main === module) {
  tests();
}
