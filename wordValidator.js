/**
  imperative/wordValidator.js (https://github.com/1egoman/que)
  This file is used to validate filters in json config files
*/

// dependencies
var _ = require("underscore"),
    S = require('string');

var _VALIDATION_TYPES = {
  length: {
    type: "int"
  },
  value: {
    type: "string"
  },
  word: {
    type: "array"
  }
}

module.exports.validateFilter = function(words, index, validator) {
  var word = words[index];

  // the response status
  var status = true;

  // loop through all the different validation types
  _.each(_.keys(_VALIDATION_TYPES), function(validation) {

    // validator doesn't exist? Just move on...
    if (!validator[validation]) return;


    // integer validation
    if ( _VALIDATION_TYPES[validation].type == "int") {

      // equalTo: property is equal to something else
      if (validator[validation].equalTo &&
        word[validation] != validator[validation].equalTo) {
          status = false;
          return;
      }

      // notEqualTo: property is not equal to something else
      if (validator[validation].notEqualTo &&
        word[validation] == validator[validation].notEqualTo) {
          status = false;
          return;
      }


      // lessThan: property is less than something else
      if (validator[validation].lessThan &&
        word[validation] >= validator[validation].lessThan) {
          status = false;
          return;
      }

      // greaterThan: property is less than something else
      if (validator[validation].greaterThan &&
        word[validation] <= validator[validation].greaterThan) {
          status = false;
          return;
      }

      // lessThanEqual: property is less than or equal to something else
      if (validator[validation].lessThanEqual &&
        word[validation] > validator[validation].lessThanEqual) {
          status = false;
          return;
      }

      // greaterThanEqual: property is less than or equal to something else
      if (validator[validation].greaterThanEqual &&
        word[validation] < validator[validation].greaterThanEqual) {
          status = false;
          return;
      }

    }


    // string validation
    if ( _VALIDATION_TYPES[validation].type == "string") {


      // equalTo: property is equal to something else
      if (validator[validation].equalTo &&
        word != validator[validation].equalTo) {
          status = false;
          return;
      }

      // notEqualTo: property is not equal to something else
      if (validator[validation].notEqualTo &&
        word == validator[validation].notEqualTo) {
          status = false;
          return;
      }

      // ends: strings ends with a substring
      if (validator[validation].ends &&
        !S(word).endsWith(validator[validation].ends) ) {
          status = false;
          return;
      }

      // starts: strings starts with a substring
      if (validator[validation].starts &&
        !S(word).startsWith(validator[validation].starts) ) {
          status = false;
          return;
      }

    }

    // array validation
    if ( _VALIDATION_TYPES[validation].type == "array") {

      // get index specified
      i = index + validator[validation].index || null;

      // equalTo: property is equal to something else
      if (validator[validation].equalTo &&
        words[i] != validator[validation].equalTo) {
          status = false;
          return;
      }

      // notEqualTo: property is not equal to something else
      if (validator[validation].notEqualTo &&
        words[i] == validator[validation].notEqualTo) {
          status = false;
          return;
      }

      // ends: strings ends with a substring
      if (validator[validation].ends &&
        !S(words[i]).endsWith(validator[validation].ends) ) {
          status = false;
          return;
      }

      // starts: strings starts with a substring
      if (validator[validation].starts &&
        !S(words[i]).startsWith(validator[validation].starts) ) {
          status = false;
          return;
      }

    }




  });

  return status;
}

// a test
/*
console.log(
  module.exports.validate("hi5", {
    length: {
      notEqualTo: 5,
      greaterThan: 2
    },
    value: {
      equalTo: "hi7"
    }
  })
)
*/
