import jwt from "jsonwebtoken";
// import { Jwt } from "jsonwebtoken";
import config from "../enviroment/enviroment.js";


export const generateJWT = (id) => {
    return new Promise((resolve, reject)=>{
        const payload = { id }

        jwt.sign(
            payload,
            config.SEED_JWT,
            {
                expiresIn: config.JWT_EXPIRE_IN
            },
            (err, token) => {
                if(err) reject (err)
                resolve(token)
            }
        );
    }); 
};