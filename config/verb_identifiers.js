var VERBS = require("../globals").VERBS;

module.exports = {
  "isVerbIf": [

    {
      "value": {
        "ends": "ed"
      },
      "then": {
        "weight": 10,
        "tense": "past"
      }
    },
    {
      "value": {
        "ends": "ing"
      },
      "then": {
        "weight": 10,
        "tense": "present"
      }
    },

    {
      "value": {
        "equalTo": "is"
      },
      "then": {
        "weight": 100,
        "tense": "present",
        "means": VERBS.ACTION.RETRIEVE
      }
    },

    {
      "value": {
        "equalTo": "get"
      },
      "then": {
        "weight": 20,
        "tense": "present",
        "means": VERBS.ACTION.RETRIEVE
      }
    },

    {
      "value": {
        "equalTo": "make"
      },
      "then": {
        "weight": 20,
        "tense": "present",
        "means": VERBS.ACTION.PERFORM
      }
    }

  ]
}
