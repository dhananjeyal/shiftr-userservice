import BaseModel from '../../../config/db';
// import Province from './province.model';

class City extends BaseModel {

    static get tableName() {
        return 'SRU7_CITY'
    }

    static get idColumn() {
        return 'SRU17_CITY_D'
    }

    // static get relationMappings() {
    //     return { 
    //         cityProvince: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: Province,
    //             join: {
    //                 from: 'SRL19_PROVINCE.SRL19_PROVINCE_D',
    //                 to: 'SRL17_CITY.SRL19_PROVINCE_D'
    //             }
    //         }
    //     }
    // }
}

export default City;
