import cors from 'cors';

export const enableCors = (app, acceptedOrigins) => {

    app.use(cors())
    
    // forma de definir los host permitidos en el CORS, de manera personalizada:
    // app.use(cors({
    //     origin: (origin, callback) => {
    //         if(acceptedOrigins.includes(origin)){
    //             return callback(null, true)
    //         }
    //         if(!origin){
    //             return callback(err, true)
    //         }
    //         return callback(new Error('not allowed host by CORS'))
    //     }}
    // )    )
}