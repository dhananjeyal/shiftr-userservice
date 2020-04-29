import { newAxios } from "../interserviceApi/index";
import BaseController from "../components/baseController";

const BOARDING_SERVICE = process.env.BOARDING_SERVICE;

class BoardingService extends BaseController {
    addLocationdetails = async (req, res, data) => {
        try {
            let result = await newAxios(req, res, {
                baseURL: NOTIFY_SERVICE,
                url: `/location/drivers`,
                method: "POST",
                data
            });
            return result;
        } catch (error) {
            this.internalServerError(req, res, error)
        }
    }
}

export default new BoardingService();
