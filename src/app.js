import express from 'express';
import { router } from './routes/index.js';
import { AppErrors } from './common/error/appError.js';
import { globalErrorHandler } from './common/error/errors.controller.js';
import morgan from 'morgan';
import config from './config/enviroment/enviroment.js';
import { enableCors } from './config/plugins/cors.plugin.js';
const app = express();

const ACCEPTED_ORIGINS = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

enableCors(app, ACCEPTED_ORIGINS);

if(config.NODE_ENV === 'development'){
    
    app.use(morgan('dev'));
}

app.use('/api/v1', router);

app.use('*', (req, res, next) => {

    return next( new AppErrors(`Can't find ${req.originalUrl} on this server`, 404));

});

app.use(globalErrorHandler)

export default app;
