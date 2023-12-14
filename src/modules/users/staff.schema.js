import z from 'zod';
import { extractValidation } from '../../common/utils/extractErrorsData.js';

const UserSchema = z.object({
    name: z 
    .string()
    .min(3, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),
    email: z
    .string()
    .email({ message: 'Invalid email' }),
    password: z
    .string()
    .min(8, { message: 'Password is too short' })
    .max(60, { message: 'Password is too long' }),
    role: z.enum(['employee', 'client'])
});

const loginUserSchema = z.object({

    email: z.string().email({ message: 'Invalid email' }),

    password: z.string()
        .min(8, { message: 'Password is too short' })
        .max(60, { message: 'Password is too long' })

});

export function validateData(data) {
 
    const result = UserSchema.safeParse(data);

    const { hasError, errorMessages, data: userData } = extractValidation(result);

    return { hasError, errorMessages, userData }
     
};

export function validatePartialData(data){

    const result = UserSchema.partial().safeParse(data);

    const { hasError, errorMessages, data: userData } = extractValidation(result);

    return { hasError, errorMessages, userData }
     
};

export function validateLoginData(data){

    const result = loginUserSchema.safeParse(data);

    const { hasError, errorMessages, data: userData } = extractValidation(result);

    return { hasError, errorMessages, userData }
}