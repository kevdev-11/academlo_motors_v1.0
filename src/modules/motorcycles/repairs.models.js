import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
import dayjs from 'dayjs';

// import format from 'date-fns';
// import date from '../motorcycles/middlewares/format-fns.middleware.js'

const MotorcyclesInRepair = sequelize.define('repairs', {

  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
    get(){
      return dayjs(this.getDataValue('date'), 'DD-MM-YYYY').format('DD-MM-YYYY');
    },
    set(dateValue){
      return this.setDataValue('date', dateValue? dayjs(dateValue).format('DD-MM-YYYY') : null)
    }
  },
  motorsNumber:{
    type: DataTypes.STRING(30),
    allowNull: false
  },
  description:{
    type: DataTypes.TEXT,
    allowNull:true
  },
  status: {
    type: DataTypes.ENUM('pending', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending'
  },
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
  }
},{
  // hooks:{
  //   beforeCreate: (record, options) => {
  //     record.dataValues.date = new Date().toLocaleString()
  //   },
  //   beforeUpdate: (record, options) => {
  //     record.dataValues.date = new Date.toLocaleString()
  //   }
  // },

});

export default MotorcyclesInRepair;