import BaseModel from '../../../config/db'
import Users from "./user.model";

class UsersDetails extends BaseModel {

    static get tableName() {
        return 'SRU04_USER_DETAIL'
    }

    static get idColumn() {
        return 'SRU04_DETAIL_D'
    }

    static get relationMappings() {
        return {
            userMaster: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                    to: 'SRU04_USER_DETAIL.SRU03_USER_MASTER_D'
                }
            }
        }
    }
}

export default UsersDetails;
