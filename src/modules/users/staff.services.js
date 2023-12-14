
import  UsersOrStaff  from "./staff.models.js";

export class UserServices {

    static async findAll(){
        try {
            return await UsersOrStaff.findAll();
        } catch (error) {
            console.log(error);
        }
    }
    static async findOne(id){
        try {
            return await UsersOrStaff.findOne({
                where: {
                    id: id,
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    static async create(data){
        try {
            return await UsersOrStaff.create(data);
        } catch (error) {
            console.log(error);
        }
    }
    static async update(user, data){
        try {
            return await user.update(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async delete(user){
        try {
            return await UsersOrStaff.update(
                { status: 'disabled' },
                {
                    where:
                        { id: user.id }
                });
        } catch (error) {
            console.log(error);
        }
    }
    

    static async findOneByEmail(email){
        try {
            return await UsersOrStaff.findOne({
                where:{
                    status: 'available',
                    email: email,
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
}