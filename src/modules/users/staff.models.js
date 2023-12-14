import { sequelize } from "../../config/database/database.js";
import { DataTypes } from "sequelize";
import { encryptedPassword } from "../../config/plugins/encryptedPass.plugin.js";

const UsersOrStaff = sequelize.define('users_staff', {

    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(90),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(90),
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('employee', 'client'),
      allowNull: false,
      defaultValue: 'client'
    },
    status: {
      type: DataTypes.ENUM('available', 'disabled'),
      allowNull: false,
      defaultValue: 'available'
    }
  },{
    hooks:{
        beforeCreate: async(staff) => {
            staff.password = await encryptedPassword(staff.password);
        }
    },
});

export default UsersOrStaff;