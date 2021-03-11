import BaseModel from '../../../config/db';
// import Province from './province.model';

class Country extends BaseModel {

    static get tableName() {
        return 'SRU15_COUNTRY'
    }

    static get idColumn() {
        return 'SRU15_COUNTRY_D'
    }

    // static get relationMappings() {
    //     return { 
    //         countryProvince: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: Province,
    //             join: {
    //                 from: 'SRL19_PROVINCE.SRL19_PROVINCE_D',
    //                 to: 'SRL18_COUNTRY.SRL19_PROVINCE_D'
    //             }
    //         }
    //     }
    // }
}

export default Country;
