import BaseModel from '../../../config/db';

class LicenseType extends BaseModel {

    static get tableName() {
        return 'SRU10_LICENSE_TYPE'
    }

    static get idColumn() {
        return 'SRU10_LICENSE_TYPE_D'
    }
}

export default LicenseType;
