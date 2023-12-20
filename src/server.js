import app from './app.js';
import config from './config/enviroment/enviroment.js';
import { authenticate, sync } from './config/database/database.js';
import { intiModel } from './config/database/associations.js';

async function main(){
    try {
        await authenticate();
        intiModel();
        await sync();
    } catch (error) {
        console.log(error);
    }
}
main();

app.listen(config.PORT, ()=>{console.log(`Listening on port ${config.PORT}! Now its up to you...`)});
    // console.log(`Listening on port ${config.PORT}! Now its up to you...`));