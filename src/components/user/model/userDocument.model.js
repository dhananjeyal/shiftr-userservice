import BaseModel from '../../../config/db'
import Users from "./user.model";

class UserDocument extends BaseModel {

    static get tableName() {
        return 'SRU05_USER_DOCUMENT'
    }

    static get idColumn() {
        return 'SRU05_DOCUMENT_D'
    }

    static get relationMappings() {
        return {
            userMaster: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU05_USER_DOCUMENT.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                }
            }
        }
    }
}

export default UserDocument;
