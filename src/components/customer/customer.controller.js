import BaseController from '../baseController';
import CategoryDetails from './model/category.model'
import { CategoryColumns } from "./model/category.columns";
import { raw } from 'objection'
let profilePath = `${`http://${process.env.PUBLIC_UPLOAD_LINK}:${process.env.PORT}/`}`


class CustomerController extends BaseController {

    constructor() {
        super();
    }

    /**
     * @DESC :Create Driver Profile
     * @param string/Integer/object
     * @return array/json
     */
    CategoryDetails = async (req, res) => {
        try {

            let result = await CategoryDetails.query().select(CategoryColumns)
                .select(raw(`CONCAT("${profilePath}public/categories/", PODO06_CATEGORY_I) as categoryImage`))
                .select(raw(`CONCAT("${profilePath}public/categories/", PODO06_IS_SELECTED_CATEGORY_I) as categoryselectedImage`));
            if (result) {
                return this.success(req, res, this.status.HTTP_OK, result, this.messageTypes.successMessages.getAll);
            } else {
                return this.errors(req, res, this.status.HTTP_BAD_REQUEST, this.messageTypes.errors.badRequest);
            }

        } catch (e) {
            return res.status(this.status.HTTP_NOT_FOUND).send();
        }
    }

}

export default new CustomerController();
