/**
  imperative/index.js (https://github.com/1egoman/que)
  This file contains the objectFragment, which is a key
  element in parsing user queries
*/

// dependencies
var _ = require("underscore"),
    fs = require("fs"),
    S = require('string');

var wV = require("./wordValidator");

// object fragment
module.exports = function(wordList) {
  this.words = wordList;
  var self = this;

  // get object definitioans
  var CATEGORIES = JSON.parse( fs.readFileSync("config/object_defs.json") ).categories;

  // determine what the general idea is that
  // is being commanded
  this.getRequested = function() {

    // for each word
    for (var wct = 0; wct < this.words.length; wct++) {
      word = this.words[wct];

      // filter by categories
      _.each(CATEGORIES, function(cat) {

        // see if the word matches...
        // console.log(word, cat, wV.validateFilter(word, cat))
        if ( wV.validateFilter(word, cat) ) {

          // apply the filter
          cat.then.value.length ?
            self.words[wct] = cat.then.value :
            self.words[wct] = undefined;
        }

      });

    }

    return _.without(this.words, undefined);

  }

}
