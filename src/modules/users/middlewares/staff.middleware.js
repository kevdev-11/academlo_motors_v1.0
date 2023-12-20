import { AppErrors } from "../../../common/error/appError.js";
import { UserServices } from "../staff.services.js";


export const validateByMiddleware = async (req, res,next) => {

    try {
        const { id } = req.params;

        const user = await UserServices.findOne(id);

        if (!user) {
            return new AppErrors(`User with id ${id} not found`, 404);
        };
        req.user = user;
        next();

    } catch (error) {
        return res.status(501).json({
            status: 'error',
            message: 'Server error: went something wrong',
            error
        })
    }
}


