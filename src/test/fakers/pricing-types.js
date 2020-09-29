var faker = require('faker');

const typeFaker = {

    type: {
        "FORPP01_PRICING_TYPE_N": faker.random.word(),
        "FORPP01_PRICING_CALCULATION_X": "Base fare + Flat fare + Value add + Tax  = Total price",
        "FORPP01_CREATE_USER_C": 1,
        "FORPP01_LAST_UPDT_USER_C": 1,
    },
    payload: {
        "name": faker.random.word(),
        "calculation": "Base fare + Flat fare + Value add + Tax  = Total price",
        "userId": "1"
    }

}

module.exports = {
    typeFaker
}