import {Exception} from "../handlers/Exception";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import {getConnection} from "typeorm";
import {Session} from "../entity/Session";
import { getToken } from "../handlers/tokenData.info";

dotenv.config();

class LogoutService {
    async logoutService(req: any) {
        const tokenData = await getToken(req);

        const {id} = tokenData;
 
        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Session)
            .where("userId = :id", {id: id})
            .execute();
    }

}

export const logoutService = new LogoutService();