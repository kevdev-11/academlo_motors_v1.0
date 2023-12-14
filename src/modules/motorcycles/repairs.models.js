
import { DataTypes } from 'sequelize';
import { sequelize } from '../../config/database/database.js';
// import format from 'date-fns';

const MotorcyclesInRepair = sequelize.define('motorcycles', {

  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER
  },
  // date: {
  //   type: DataTypes.DATEONLY,
  //   allowNull: false,
  //   get() {
  //     return format(this.getDataValue('date'), 'dd-MM-yyyy');
  //   },
  //   set(date) {
  //     this.setDataValue('date', date);
  //   }
  // },
  date: {
    type: DataTypes.STRING,
    allowNull:false
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
});

export default MotorcyclesInRepair;