import { catchAsync } from "../../common/error/catchAsync.js";
import jwt from 'jsonwebtoken';
import config from "../../config/enviroment/enviroment.js";
import { promisify } from 'node:util'; // viene de 'util' es un método de Node
import { UserServices } from "../users/staff.services.js";
import { AppErrors } from "../../common/error/appError.js";

export const protect = catchAsync(async(req, res, next)=> {
    
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1] 
    }
    // console.log(token);

    if(!token){
        return next(new AppErrors('you are not logged in!, please login to get access', 401))
    };

    const decoded = await promisify(jwt.verify)(token, config.SEED_JWT);

    const user = await UserServices.findOne(decoded.id);
    
    console.log(user)
    if(!user){
        return next(new AppErrors('invalid user / the owner of this token is not longer available', 401))
    }
    
    // if(user.passwordAt){
    //     const changedTimeStamp = parseInt(user.passwordAt.getTime()/1000, 10)
        
    //     if(decoded.iat < changedTimeStamp){
    //         return next(
    //             new AppErrors(
    //                 'user-password changed recently, please login again in fetch',
    //                 401
    //             )
    //         );
    //     }
    // }
   
     req.sessionUser = user;
    
     next();
});

export const protectUserAccount = (req, res, next) => {

    const { user , sessionUser } = req;

    if(user.id !== sessionUser.id) {
        return next(new AppErrors('do not have permission to manipulate this account', 401))
    }
    next();

};

export const restrictTo = (rol1, rol2) => {
    
    return (res, req, next) => {    
        
        rol1 ? false : rol2.includes(req.sessionUser.role)
        if(rol1 === 'client')
        {
            return next(new AppErrors('forbidden access', 403))
        }
        // if(!roles.includes(req.sessionUser.role)) {
        //     return next(new AppErrors('forbidden access', 403))
        // }
        next();
    }
}
