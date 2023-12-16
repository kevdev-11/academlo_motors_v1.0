import z from 'zod';
import { extractValidation } from '../../common/utils/extractErrorsData.js';

const repairSchema = z.object(
    
    {
        date: z.string(),

        motorsNumber: z
        .string()
        .min(5, {message: 'Must be more than five characters alphanumeric'})
        .max(50, { message: 'text is too long' }),
        description: z
        .string()
        .min(3, { message: 'text is too short' })
        .max(50, { message: 'text is too long' }),
        userId: z
        .number()
    }
);

export function validateData(data){

    const result = repairSchema.safeParse(data);

    const { hasError, errorMessages, data: motorsData } = extractValidation(result)

    return { hasError, errorMessages, motorsData }
     
};
