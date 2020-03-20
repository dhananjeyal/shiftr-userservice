import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class ExperienceDetails extends BaseModel {

    static get tableName() {
        return 'SRU09_DRIVEREXP'
    }

    static get idColumn() {
        return 'SRU09_DRIVEREXP_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            }
        }
    }

}

export default ExperienceDetails;
