// import { parse } from "date-fns";
import { catchAsync } from "../../common/error/catchAsync.js";
import { validateData } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js";

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

        const { repair } = req.repair;

            return res.status(200).json(
                {
                    message: 'method get-one works',
                    repair
                }
            )
});
    
    
export const create = catchAsync(async (req, res, next) => {
        
    const { hasError, errorMessages, motorsData } = validateData(req.body);
    
    console.log(req.body);

        if(hasError){
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        };

    const newAppointment = await RepairService.createAppointment(motorsData);

        return res.status(200).json(
            {
                message: `new-appointment-created works sucessfully created!`,
                newAppointment
            }
        )
});


export const update = catchAsync(async (req, res, next) => {

       const { repair } = req.repair

        const setCompleted = await RepairService.updateAppointment(
            repair,
            { status: 'completed' },
        )
        console.log(repair);

        return res.status(203).json(
            {
                message: 'method patch works',
                data: req.body,
                setCompleted
            }
        )
});


export const cancel = catchAsync(async (req, res, next) => {

        const { repair } = req.repair;

        const setCancelled = await RepairService.cancelAppointment(repair,
            { status: "cancelled" }
        )
        // verificando si el status es completed, enviando el error:
        if (!repair) {
            return res.status(404).json(
                {
                    message: 'not resgistered as pending'   
                }   
            )
        }
        // console.log(setCancelled)

        return res.status(200).json(
            {
                message: 'method delete works',
                data: req.body,
                setCancelled
            }
        )
});
