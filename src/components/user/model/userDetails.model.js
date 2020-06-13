import BaseModel from '../../../config/db'
import Users from "./user.model";
import AddressDetails from './address.model';
import ContactInfo from '../../driver/model/contactInfo.model';

class UsersDetails extends BaseModel {

    static get tableName() {
        return 'SRU04_USER_DETAIL'
    }

    static get idColumn() {
        return 'SRU04_DETAIL_D'
    }

    static get relationMappings() {
        return {
            userMaster: {
                relation: BaseModel.HasOneRelation,
                modelClass: Users,
                join: {
                    from: 'SRU03_USER_MASTER.SRU03_USER_MASTER_D',
                    to: 'SRU04_USER_DETAIL.SRU03_USER_MASTER_D'
                }
            },
            userAddressDetails: {
                relation: BaseModel.HasOneRelation,
                modelClass: AddressDetails,
                join: {
                    from: 'SRU06_ADDRESS.SRU03_USER_MASTER_D',
                    to: 'SRU04_USER_DETAIL.SRU03_USER_MASTER_D'
                },
            },
            contactInfo: {
                relation: BaseModel.HasManyRelation,
                modelClass: ContactInfo,
                join: {
                    from: 'SRU19_CONTACT_INFO.SRU03_USER_MASTER_D',
                    to: 'SRU04_USER_DETAIL.SRU03_USER_MASTER_D'
                }
            }
        }
    }
}

export default UsersDetails;
