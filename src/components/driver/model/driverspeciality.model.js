import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class SpecialityDetails extends BaseModel {

    static get tableName() {
        return 'SRU12_DRIVER_SPECIALITY'
    }

    static get idColumn() {
        return 'SRU12_DRIVER_SPECIALITY_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: Users,
                join: {
                    from: 'SRU12_DRIVER_SPECIALITY.SRU09_DRIVEREXP_D',
                    to: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_KEY_D'
                }
            }
        }
    }

}

export default SpecialityDetails;
