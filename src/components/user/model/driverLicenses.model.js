import BaseModel from '../../../config/db'

class DriverLicenses extends BaseModel {

    static get tableName() {
        return 'SRU22_DRIVER_LICENSE'
    }

    static get idColumn() {
        return 'SRU22_DRIVER_LICENSE_D'
    }

}

export default DriverLicenses;
