import 'dotenv/config';
import env from 'env-var';


const config = {

        PORT: env.get('PORT').required().asPortNumber(),
        DB: env.get('DB_URI').required().asUrlString(),
        NODE_ENV: env.get('NODE_ENV').required().asString(),
        SEED_JWT: env.get('SECRET_JWT').required().asString(),
        JWT_EXPIRE_IN: env.get('JWT_EXPIRE').required().asString()
}

export default config;