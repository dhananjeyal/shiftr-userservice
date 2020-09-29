import BaseModel from '../../../config/db'
import ExperienceDetails from './experience.model';


class ExperienceReferenceDetails extends BaseModel {

    static get tableName() {
        return 'SRU20_DRIVEREXP_REFERENCE'
    }

    static get idColumn() {
        return 'SRU20_DRIVEREXP_REFERENCE_D'
    }

    // static get relationMappings() {
    //     return {
    //         driverExperienceDetails: {
    //             relation: BaseModel.HasOneRelation,
    //             modelClass: ExperienceDetails,
    //             join: {
    //                 from: 'SRU20_DRIVEREXP_REFERENCE.SRU20_SPECIALITY_REFERENCE_N',
    //                 to: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N'
    //             }
    //         }
    //     }
    // }

}

export default ExperienceReferenceDetails;
