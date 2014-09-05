module.exports.CONCEPTS = {

  /**
    Boolean: boolean values to define the state of something
  */
  BOOLEAN: {
    TRUE: "CONCEPTS.BOOLEAN.TRUE",
    FALSE: "CONCEPTS.BOOLEAN.FALSE"
  },


  /**
    Entity: another living or nonliving physical thing
  */
  ENTITY: {
    QUE: "CONCEPTS.ENTITY.QUE",
    USER: "CONCEPTS.ENTITY.USER",
    PERSON: "CONCEPTS.ENTITY.PERSON",

    CONSUMABLES: {
      FOOD: "CONCEPTS.ENTITY.CONSUMABLES.FOOD",
      DRINK: "CONCEPTS.ENTITY.CONSUMABLES.DRINK",
    },

    EVENT: {
      WHEN: "CONCEPTS.ENTITY.EVENT.WHEN",
      WHERE: "CONCEPTS.ENTITY.EVENT.WHERE",
    }
  },

  /**
    Abstract: concepts that aren't physical
  */
  ABSTRACT: {
    TIME: "CONCEPTS.ABSTRACT.TIME"
  }
}


module.exports.VERBS = {

  /**
    Action: Each verb in this category describes how to do something
  */
  ACTION: {

    RETRIEVE: "VERBS.ACTION.RETRIEVE",
    PERFORM: "VERBS.ACTION.PERFORM"

  }
}
