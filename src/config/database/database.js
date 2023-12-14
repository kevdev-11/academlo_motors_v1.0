import { Sequelize } from "sequelize";
import config  from "../enviroment/enviroment.js";

export const sequelize = new Sequelize(config.DB, {
    logging: false
});

export const authenticate = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.log('Unable to connect to the database:', error);
    }
};

export const sync = async () => {
    try {
        await sequelize.sync();
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.log('Unable to synchronize the models:', error);
    }
}

// export default { sequelize, authenticate, sync };