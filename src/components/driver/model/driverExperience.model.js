import BaseModel from '../../../config/db'
import Users from "../../user/model/user.model";
import Speciality from '../model/driverspeciality.model';
import Country from '../../masterdetails/model/country.model';
import Province from '../../masterdetails/model/province.model';
import ExperienceList from './experienceList.model';
import ExperienceReferenceDetails from './experienceReference.model';

class ExperienceDetails extends BaseModel {

    static get tableName() {
        return 'SRU09_DRIVEREXP'
    }

    static get idColumn() {
        return 'SRU09_DRIVEREXP_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            },
            SpecialityDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: Speciality,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N',
                    to: 'SRU12_DRIVER_SPECIALITY.SRU09_SPECIALITY_REFERENCE_N'
                }
            },
            provinceDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: Province,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU16_PROVINCE_D',
                    to: 'SRU16_PROVINCE.SRU16_PROVINCE_D'
                }
            },
            experienceListDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: ExperienceList,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU13_EXPERIENCE_D',
                    to: 'SRU13_EXPERIENCE.SRU13_EXPERIENCE_D'
                }
            },
            countryDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: Country,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU15_COUNTRY_D',
                    to: 'SRU15_COUNTRY.SRU15_COUNTRY_D'
                }
            },
            experienceReferenceDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: ExperienceReferenceDetails,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU09_SPECIALITY_REFERENCE_N',
                    to: 'SRU20_DRIVEREXP_REFERENCE.SRU20_SPECIALITY_REFERENCE_N'
                }
            },
        }
    }

}

export default ExperienceDetails;
