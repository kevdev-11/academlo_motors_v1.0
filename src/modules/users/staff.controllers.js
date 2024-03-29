import { catchAsync } from "../../common/error/catchAsync.js";
import { generateJWT } from "../../config/plugins/jwt.plugin.js";
import { validateData, validateLoginData, validatePartialData } from "./staff.schema.js";
import { UserServices } from "./staff.services.js";
import { AppErrors } from "../../common/error/appError.js"
import { encryptedPassword, verifyPassword } from "../../config/plugins/encryptedPass.plugin.js";


const findAllUsers = catchAsync(async(req, res, next) => { 

        const users = await UserServices.findAll();

        return res.status(201).json({
            message: 'All users right',
            users
        });
    
});

const findOneUser = catchAsync(async(req, res, next) => { 
  
        const { user } = req;
        console.log(user)
        if(!user || user.status === 'disabled'){
            return next(new AppErrors('this account does not exist', 404))
        }
        // console.log(req.sessionUser)

        return res.status(200).json({
            message: 'user founded in resources',
            user,
            sessionUser: req.sessionUser
        });
 
});

const register = catchAsync(async(req, res, next) => { // post

    const { hasError, errorMessages, userData} = validateData(req.body) 

        if(hasError) {
            return res.status(422).json({
                status: 'error',
                message: errorMessages
            })
        }
        
        const user = await UserServices.create(userData);
        
        const token = await generateJWT(user.id);

        return res.status(201).json({
            token,
            user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
            }
        });

});

const login = catchAsync(async(req, res, next) => {

    
    const { hasError, errorMessages, userData } = validateLoginData(req.body);

    if(hasError){
        return res.status(422).json({
            status:'error',
            message: errorMessages
        })
    }
    
    const user = await UserServices.findOneByEmail(userData.email);

    if(!user){
        return next(new AppErrors('this account does not exist', 404))
    }
    
    const matchPasswords = await verifyPassword(userData.password, user.password);

    if(!matchPasswords) {
        return next(new AppErrors('Incorrect/invalid data of access', 401))
    }
    
    const token = await generateJWT(user.id);

    if(!token){
        return next(new AppErrors('this token is unable', 404))
    }

    return res.status(200).json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        }
    });
});

const updateUser = catchAsync(async(req, res, next) => { // put

    const {hasError, userData, errorMessages} = validatePartialData(req.body);

    if (hasError) {
        return res.status(422).json({
            status: 'error',
            message: 'Invalid data',
            errors: errorMessages
        })
    }
    const {user, sessionUser} = req;
        
        if(!user){
            return next(new AppErrors('this account does not exist', 404))
        }

        const userUpdated = await user.update(userData, {
            name: user.name,
            email: user.email
        });

        return res.status(200).json({
            sessionUser,
            message: 'updated users is right!',
            userUpdated
        });
});

const disableUser = catchAsync(async(req, res, next) => { // delete
   
        const {user} = req;
        
        await UserServices.delete(user);

        return res.status(200).json({
            message: 'User deleted successfully',
            data: null
        });

});

const passwordChanged = catchAsync(async(req, res, next)=> { // pendiente por revisar

    const { sessionUser } = req;
    
    const { currentPassword, newPassword } = validateLoginData(req.body);
    
    if(currentPassword === newPassword){
        return next(new AppErrors('the passwords cannot be equal', 401))
    }   
    
    const isCorrectPassword = await verifyPassword(currentPassword, sessionUser.password);

    if(!isCorrectPassword){
        return next(new AppErrors('incorrect email or password', 401))
    }
    
    const hashedNewPassword = await encryptedPassword(newPassword);
    
    const restPass = await UserServices.update(sessionUser, {
        password: hashedNewPassword,
    });

    console.log(restPass);

    return res.status(300).json({
        message:'The user password was updated',
        restPass,
        sessionUser
    })

}) 

export { 
    findAllUsers,
    register,
    login,
    findOneUser,
    updateUser,
    disableUser,
    passwordChanged
} 