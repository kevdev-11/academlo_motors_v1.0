import UsersOrStaff from "../users/staff.models.js";
import  MotorcyclesInRepair  from "./repairs.models.js";


export class RepairService {

    static async getAllRepairs() {
        try {
            return await MotorcyclesInRepair.findAll({
                where: {
                    status: 'pending'
                },
                include: [
                    {
                        model: UsersOrStaff
                    }
                ]
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async getOneRepair(id) {
        try {
            return await MotorcyclesInRepair.findOne({
                where:
                {
                    id,
                    status: 'pending'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async createAppointment(data) {
        try {
            return await MotorcyclesInRepair.create(data);
        } catch (error) {
            console.log(error);
        }
    }
    static async updateAppointment(repair, data) {
        try {
            return await repair.update(data);
        } catch (error) {
            console.log(error);
        }
    }
    static async cancelAppointment(repair, data) {
        try {
            return await MotorcyclesInRepair.update(data, {
                where: {
                    id: repair.id,
                    status: 'pending'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}
