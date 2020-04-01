import BaseModel from '../../../config/db'
import UsersDetails from "./userDetails.model";
import AddressDetails from "./address.model";
import UserDocument from "./userDocument.model";
import FinancialDetails from "../../driver/model/financial.model";
import ExperienceDetails from '../../driver/model/experience.model';
import ContactInfo from '../../driver/model/contactInfo.model';
import SpecialityTraining from '../../driver/model/speciality.model';

class Users extends BaseModel {

    static get tableName() {
        return 'SRU03_USER_MASTER'
    }

    static get idColumn() {
        return 'SRU03_USER_MASTER_D'
    }

    static get relationMappings() {
        return {
            userDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: UsersDetails,
                join: {
                    from: 'SRU04_USER_DETAIL.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                },
            },
            addressDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: AddressDetails,
                join: {
                    from: 'SRU06_ADDRESS.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                },
            },            
            experienceDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: ExperienceDetails,
                join: {
                    from: 'SRU09_DRIVEREXP.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            },            
            DriverspecialityDetails: {
                relation: BaseModel.HasManyRelation,
                modelClass: SpecialityTraining,
                join: {
                    from: 'SRU11_SPECIALITY_TRAINING.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            },            
            financialDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: FinancialDetails,
                join: {
                    from: 'SRU08_FINANCIAL.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            },          
            documents: {
                relation: BaseModel.HasManyRelation,
                modelClass: UserDocument,
                join: {
                    from: 'SRU05_USER_DOCUMENT.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            },
            contactInfoDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: ContactInfo,
                join: {
                    from: 'SRU09_CONTACT_INFO.SRU03_USER_MASTER_D',
                    to: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D'
                }
            }
        }
    }

}

export default Users;
