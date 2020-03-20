import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class FinancialDetails extends BaseModel {

    static get tableName() {
        return 'SRU08_FINANCIAL'
    }

    static get idColumn() {
        return 'SRU08_FINANCIAL_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU08_FINANCIAL.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                }
            }
        }
    }

}

export default FinancialDetails;
