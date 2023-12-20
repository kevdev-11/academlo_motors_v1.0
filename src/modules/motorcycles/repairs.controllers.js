
import { AppErrors } from "../../common/error/appError.js";
import { catchAsync } from "../../common/error/catchAsync.js";
import { validateData } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js";
import Randomstring from "randomstring";

export const findAll = catchAsync(async (req, res, next) => {

    const listRepairs = await RepairService.getAllRepairs();
    console.log(listRepairs)
    
    res.status(200).json(
        {
            message: 'method getAll works',
            listRepairs
        }
        )
});

export const findOne = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const repair = await RepairService.getOneRepair(id)

    if(!repair || null){
        return next(new AppErrors('this repair service is not pending or does not exist', 404))
    }

        console.log(repair)

            return res.status(200).json(
                {
                    message: 'method get-one works',
                    repair
                }
            )
});
    
    
export const create = catchAsync(async (req, res, next) => {
        
    const { hasError, errorMessages, motorsData } = validateData(req.body);
    
    const randomized = Randomstring.generate(17).toUpperCase();

        if(hasError){
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        };

    const newAppointment = await RepairService.createAppointment({
        date: motorsData.date,
        description: motorsData.description,
        motorsNumber: randomized,
        userId: motorsData.userId
    });

        return res.status(200).json(
            {
                message: `new-appointment-created works sucessfully!`,
                newAppointment,
                motorsData,
                randomized
            }
        )
});


export const update = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const repair = await RepairService.getOneRepair(id)

    if(!repair || null){
        return next(new AppErrors('this repair service is not pending or does not exist', 404))
    }

        const setCompleted = await RepairService.updateAppointment(
            repair,
            { status: 'completed' },
        )
        console.log(setCompleted);

        return res.status(203).json(
            {
                message: 'method patch works',
                setCompleted
            }
        )
});


export const cancel = catchAsync(async (req, res, next) => {

    const { id } = req.params;

    const repair = await RepairService.getOneRepair(id)

    if(!repair || null){
        return next(new AppErrors('this repair service is not pending or does not exist', 404))
    }

        const setCancelled = await RepairService.cancelAppointment(repair,
            { status: "cancelled" }
        )
       
        if (!repair) {
            return res.status(404).json(
                {
                    message: 'not resgistered as pending'   
                }   
            )
        }

        return res.status(200).json(
            {
                message: 'method delete works',
                setCancelled
            }
        )
});
