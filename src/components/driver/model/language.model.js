import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class Language extends BaseModel {

    static get tableName() {
        return 'SRU11_DRIVER_LANGUAGE'
    }

    static get idColumn() {
        return 'SRU11_DRIVER_LANGUAGE_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU11_DRIVER_LANGUAGE.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                }
            }
        }
    }
}

export default Language;
