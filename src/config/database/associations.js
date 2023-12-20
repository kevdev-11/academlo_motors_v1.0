import MotorcyclesInRepair from "../../modules/motorcycles/repairs.models.js";
import UsersOrStaff from "../../modules/users/staff.models.js";

export const intiModel = () => { 
    
    UsersOrStaff.hasMany(MotorcyclesInRepair, {foreignKey: 'user_id'});
    MotorcyclesInRepair.belongsTo(UsersOrStaff, {foreignKey: 'user_id'})
}

