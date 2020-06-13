import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class AllLanguages extends BaseModel {

    static get tableName() {
        return 'SRU14_LANGUAGE'
    }

    static get idColumn() {
        return 'SRU14_LANGUAGE'
    }

}

export default AllLanguages;
