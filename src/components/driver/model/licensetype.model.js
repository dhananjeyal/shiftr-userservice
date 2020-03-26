import BaseModel from '../../../config/db';
import DriverExperience from '../model/experience.model';

class LicenseType extends BaseModel {

    static get tableName() {
        return 'SRU10_LICENSE_TYPE'
    }

    static get idColumn() {
        return 'SRU10_LICENSE_TYPE_D'
    }

    static get relationMappings() {
        return {
            driverExperience: {
                relation: BaseModel.HasOneRelation,
                modelClass: DriverExperience,
                join: {
                    from: 'SRU10_LICENSE_TYPE.SRU10_LICENSE_TYPE_D',
                    to: 'sru09_driverexp.SRU09_LICENSE_TYPE_N'
                }
            }
        }
    }
}

export default LicenseType;
