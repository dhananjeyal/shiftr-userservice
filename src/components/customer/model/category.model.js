import BaseModel from '../../../config/db'

class CategoryDetails extends BaseModel {

    static get tableName() {
        return 'SRO06_ORDER_CATEGORY'
    }

    static get idColumn() {
        return 'SRO06_CATEGORY_D'
    }
}

export default CategoryDetails;
