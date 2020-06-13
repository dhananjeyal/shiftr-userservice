import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class ContactInfo extends BaseModel {

    static get tableName() {
        return 'SRU19_CONTACT_INFO'
    }

    static get idColumn() {
        return 'SRU19_CONTACT_INFO_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU19_CONTACT_INFO.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                }
            }
        }
    }
}

export default ContactInfo;
