import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";

class VehicleDetails extends BaseModel {

    static get tableName() {
        return 'SRU07_VEHICLE'
    }

    static get idColumn() {
        return 'SRU07_VEHICLE_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU07_VEHICLE.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            }
        }
    }

}

export default VehicleDetails;
