var CONCEPTS = require("../globals").CONCEPTS;

module.exports = {
  categories: [

    /**
      Pronowns
    */
    {
      "value": {
        "equalTo": "you"
      },
      "then": {
        "means": CONCEPTS.ENTITY.QUE
      }
    },

    {
      "value": {
        "equalTo": "me"
      },
      "then": {
        "means": CONCEPTS.ENTITY.USER
      }
    },

    {
      "value": {
        "equalTo": "I"
      },
      "then": {
        "means": CONCEPTS.ENTITY.USER
      }
    },

    /**
      Boolean Answers
    */
    {
      "value": {
        "equalTo": "yes"
      },
      "then": {
        "means": CONCEPTS.BOOLEAN.TRUE
      }
    },

    {
      "value": {
        "equalTo": "no"
      },
      "then": {
        "means": CONCEPTS.BOOLEAN.FALSE
      }
    },



    /**
      Remove words that are short, most likely they aren't needed
    */
    {
      "length": {
        "lessThanEqual": 1
      },
      "then": {
        "value": ""
      }
    },

    {
      "value": {
        "equalTo": "the"
      },
      "then": {
        "value": ""
      }
    },

    {
      "value": {
        "equalTo": "time"
      },
      "then": {
        "means": CONCEPTS.ABSTRACT.TIME
      }
    },

    {
      "word": {
        "index": -1,
        "equalTo": "in"
      },
      "then": {
        "means": CONCEPTS.ENTITY.EVENT.ALL
      }
    }

  ]
}
