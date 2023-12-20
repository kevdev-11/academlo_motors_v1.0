import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
import dayjs from 'dayjs';

const MotorcyclesInRepair = sequelize.define('repairs', {

  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  date: {
    allowNull: false,
    get(){
      return dayjs(this.getDataValue('date'), 'DD-MM-YYYY').format('DD-MM-YYYY');
    },
    type: DataTypes.STRING,
  },
  motorsNumber:{
    type: DataTypes.STRING(20),
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
  },
});

export default MotorcyclesInRepair;