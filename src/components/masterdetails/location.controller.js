import BaseController from '../baseController';
import City from './model/city.model';
import Province from './model/province.model';
import { provinceColumns, countryColumns, cityColumns } from './model/location.columns';
import { CountryType} from "../../constants";


class LocationController extends BaseController {

    constructor() {
        super();
    }

    /**
     * @DESC : Get all City
     * @return array/json
     * @param req
     * @param res
     */
    getCity = async (req, res) => {
        try {
            let provinceId = req.params.provinceId;

            let responseData = await City.query().select(cityColumns)
            .where('SRU17_PROVINCE_D', provinceId);
            return this.success(req, res, this.status.HTTP_OK, responseData, this.messageTypes.successMessages.getAll);
       
        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };

    
    /**
     * @DESC : Get Province By country
     * @return array/json
     * @param req
     * @param res
     */
    getProvince = async (req, res) => {
        try {
            let countryId = req.params.countryId;

            let responseData= await Province.query().select(countryColumns)
            .where('SRU15_COUNTRY_D', countryId);
            return this.success(req, res, this.status.HTTP_OK, responseData, this.messageTypes.successMessages.getAll);
        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };

     /**
     * @DESC : Get All Province
     * @return array/json
     * @param req
     * @param res
     */
    getAllProvince = async (req, res) => {
        try {

            let responseData = await Province.query().select(countryColumns)
            return this.success(req, res, this.status.HTTP_OK, responseData, this.messageTypes.successMessages.getAll);
        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };


    /**
     * @DESC : Get Province By country
     * @return array/json
     * @param req
     * @param res
     */
    getProvincelist = async (req, res) => {
        try {
            
            let responseData= await Province.query().select(provinceColumns)
            .where('SRU15_COUNTRY_D', CountryType.CANADA_LIST);
            return this.success(req, res, this.status.HTTP_OK, responseData, this.messageTypes.successMessages.getAll);
        } catch (e) {
            this.internalServerError(req, res, e)
        }
    };

}

export default new LocationController();
