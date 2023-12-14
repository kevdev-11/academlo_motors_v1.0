import { AppErrors } from "../../../common/error/appError.js";
import { catchAsync } from "../../../common/error/catchAsync.js";
import { RepairService } from "../repairs.service.js"
// import { catchAsync } from "../../common/error/catchAsync.js";
// import jwt from 'jsonwebtoken';
// import config from "../../config/enviroment/enviroment.js";
// import { promisify } from 'util'; // viene de 'util' es un método de Node

export const validateStatusPending = catchAsync(async(res, req, next) => {

        const { id } = req.params;

        const repairExist = await RepairService.getOneRepair(id)

        console.log(repairExist)

        if(repairExist.status !== 'pending'){
            return next(new AppErrors('this repair service is not pending or does not exist', 404))
        }
        req.repair = repair;
        next()
})

// const { id } = req.params;
// const searchPendingRepair = await RepairService.getOneRepair(id);

// if (searchPendingRepair === null) {
//     return res.status(404).json(
//         {
//             message: 'not registered as pending'
//         }
//     )
// }