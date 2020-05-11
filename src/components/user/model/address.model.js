import BaseModel from '../../../config/db'
import Users from "./user.model";
import ProvinceModel from '../../driver/model/province.model';

class AddressDetails extends BaseModel {

    static get tableName() {
        return 'SRU06_ADDRESS'
    }

    static get idColumn() {
        return 'SRU06_ADDRESS_D'
    }

    static get relationMappings() {
        return {
            userMaster: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU06_ADDRESS.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                }
            },
            provinceDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: ProvinceModel,
                join: {
                    from: 'SRU06_ADDRESS.SRU06_PROVINCE_D',
                    to: 'SRU16_PROVINCE.SRU16_PROVINCE_D',
                }
            }
        }
    }
}

export default AddressDetails;
