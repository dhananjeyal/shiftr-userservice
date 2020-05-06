import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class Radious extends BaseModel {

    static get tableName() {
        return 'SRU10_RADIOUS'
    }

    static get idColumn() {
        return 'SRU10_RADIOUS_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU10_RADIOUS.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                }
            }
        }
    }
}

export default Radious;
