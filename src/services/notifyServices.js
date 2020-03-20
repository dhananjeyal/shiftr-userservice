import { newAxios } from "../interserviceApi/index";
import BaseController from "../components/baseController";

const NOTIFY_SERVICE = process.env.NOTIFY_SERVICE;

class NotifyService extends BaseController {
    sendNotication = async (req, res, data) => {
        try {
            let result = await newAxios(req, res, {
                baseURL: NOTIFY_SERVICE,
                url: `/api/notify/sendUser`,
                method: "POST",
                data
            });
            return result;
        } catch (error) {
            this.internalServerError(req, res, error)
        }
    }
}

export default new NotifyService();
