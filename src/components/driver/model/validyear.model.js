import BaseModel from '../../../config/db'

class Validyear extends BaseModel {

    static get tableName() {
        return 'SRU18_VALID_YEAR'
    }

    static get idColumn() {
        return 'SRU18_VALID_YEAR_D'
    }


}

export default Validyear;
