import BaseModel from '../../../config/db';
// import City from './city.model';
// import Country from './country.model';

class Province extends BaseModel {

    static get tableName() {
        return 'SRU16_PROVINCE'
    }

    static get idColumn() {
        return 'SRU16_PROVINCE_D'
    }

    // static get relationMappings() {
    //     return { 
    //         provinceCity: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: City,
    //             join: {
    //                 from: 'SRL17_CITY.SRL19_PROVINCE_D',
    //                 to: 'SRL19_PROVINCE.SRL19_PROVINCE_D'
    //             }
    //         },
    //         countryProvince: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: Country,
    //             join: {
    //                 from: 'SRL18_COUNTRY.SRL18_COUNTRY_D',
    //                 to: 'SRL19_PROVINCE.SRL18_COUNTRY_D'
    //             }
    //         }
    //     }
    // }
}

export default Province;
