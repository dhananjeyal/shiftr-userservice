import BaseModel from '../../../config/db';

class ExperienceList extends BaseModel {

    static get tableName() {
        return 'SRU13_EXPERIENCE'
    }

    static get idColumn() {
        return 'SRU13_EXPERIENCE_D'
    }
}

export default ExperienceList;
