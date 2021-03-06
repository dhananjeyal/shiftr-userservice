import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";
import Speciality from '../model/driverspeciality.model';
import ExperienceReferenceDetails from './experienceReference.model';

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
            },
            SpecialityDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Speciality,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N',
                    to: 'sru12_driver_speciality.SRU09_SPECIALITY_REFERENCE_N'
                }
            },
            experienceReferenceDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: ExperienceReferenceDetails,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N',
                    to: 'SRU20_DRIVEREXP_REFERENCE.SRU20_SPECIALITY_REFERENCE_N'
                }
            }
        }
    }

}

export default ExperienceDetails;
