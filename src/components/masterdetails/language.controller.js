import BaseController from '../baseController';
import Lang from './model/language.model';
import { language } from './model/language.columns';


class LanguageController extends BaseController {

    constructor() {
        super();
    }

    /**
     * @DESC : Get all fleet details method
     * @return array/json
     * @param req
     * @param res
     */
    showAllLanguage = async (req, res) => {
        try {
            let languages = await Lang.query().select(language);
            return this.success(req, res, this.status.HTTP_OK, languages, this.messageTypes.successMessages.successful);
        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };
}

export default new LanguageController();
