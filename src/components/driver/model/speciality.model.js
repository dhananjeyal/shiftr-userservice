import BaseModel from '../../../config/db';

class SpecialityTraining extends BaseModel {

    static get tableName() {
        return 'SRU11_SPECIALITY_TRAINING'
    }

    static get idColumn() {
        return 'SRU11_SPECIALITY_TRAINING_D'
    }

    static get relationMappings() {
        return {
            userMaster: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU11_SPECIALITY_TRAINING.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            }
        }
    }


}

export default SpecialityTraining;
