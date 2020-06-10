import BaseModel from '../../../config/db'

class Contactus extends BaseModel {

    static get tableName() {
        return 'SRU21_CONTACTUS'
    }

    static get idColumn() {
        return 'SRU21_CONTACTUS_D'
    }

}

export default Contactus;
