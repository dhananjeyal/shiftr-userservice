import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";
import ExperienceDetails from '../model/experience.model';
import SpecialityTraining from '../model/speciality.model';

class SpecialityDetails extends BaseModel {

    static get tableName() {
        return 'SRU12_DRIVER_SPECIALITY'
    }

    static get idColumn() {
        return 'SRU12_DRIVER_SPECIALITY_D'
    }


    static get relationMappings() {
        return {
            userMaster: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU12_DRIVER_SPECIALITY.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            },
            SpecialityTrainingDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: SpecialityTraining,
                join: {
                    from: 'SRU12_DRIVER_SPECIALITY.SRU11_SPECIALITY_TRAINING_D',
                    to: 'SRU11_SPECIALITY_TRAINING.SRU11_SPECIALITY_TRAINING_D'
                }
            },
            specialityExpDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: ExperienceDetails,
                join: {
                    from: 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N',
                    to: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N'
                }
            }
        }
    }

}

export default SpecialityDetails;
