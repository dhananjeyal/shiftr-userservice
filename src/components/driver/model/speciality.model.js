import BaseModel from '../../../config/db';

class SpecialityTraining extends BaseModel {

    static get tableName() {
        return 'SRU11_SPECIALITY_TRAINING'
    }

    static get idColumn() {
        return 'SRU11_SPECIALITY_TRAINING_D'
    }
}

export default SpecialityTraining;
