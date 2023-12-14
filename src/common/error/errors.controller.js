import { AppErrors } from "./appError.js";
import  config  from '../../config/enviroment/enviroment.js';
import { Errors } from "./errors.model.js";


const Error23505 = () => {
    
    return new AppErrors('email is duplicated or same, please set another', 400)
}
const errorProductions = async(err, res) => {
    await Errors.create({
        status: err.status,
        message: err.message,
        stack: err.stack
    });
    
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        })
    }else {
        console.log('ERROR 💥:', err);
        return res.status(500).json({
            status: 'failure_code_server',
            message: 'Something went very wrong'
        })
    }
}

export const globalErrorHandler = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'fail_global_error';

    if(config.NODE_ENV === 'development'){
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
            stack: err.stack,
            err
        })
    }
    if(config.NODE_ENV === 'production'){
        let error = {...err};
        if(err.parent.code === '23505'){
            error = Error23505()
        }
        errorProductions(error, res);
    }

    // return res.status(err.statusCode).json({
    //     status: err.status,
    //     message: err.message
    // })
}