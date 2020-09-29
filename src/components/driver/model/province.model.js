import BaseModel from '../../../config/db';

class ProvinceModel extends BaseModel {

    static get tableName() {
        return 'SRU16_PROVINCE'
    }

    static get idColumn() {
        return 'SRU16_PROVINCE_D'
    }

}

export default ProvinceModel;
