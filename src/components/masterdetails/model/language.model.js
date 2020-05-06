import BaseModel from '../../../config/db';

class Language extends BaseModel {

    static get tableName() {
        return 'SRU14_LANGUAGE'
    }

    static get idColumn() {
        return 'SRU14_LANGUAGE_D'
    }

    // static get relationMappings() { //no relationship so far.
    //     return { 
    //         fleetBusType: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: BusType,
    //             join: {
    //                 from: 'SRF12_BUS_TYPE.SRF12_BUS_TYPE_D',
    //                 to: 'SRF11_FLEET_MASTER.SRF12_BUS_TYPE_D'
    //             }
    //         }
    //     }
    // }
}

export default Language;
