import express from 'express';
import { 
    findAllUsers,
    register,
    login,
    findOneUser,
    updateUser,
    disableUser as erase,
    passwordChanged } 
from './staff.controllers.js';

import { validateByMiddleware } from './middlewares/staff.middleware.js';
import { protect, protectUserAccount, restrictTo } from '../middleware/protect.middleware.js';

export const router = express.Router();
// rutas raiz

router.post('/register', register);

router.post('/login', login);

router.use(protect)

router.get('/',restrictTo('employee'), findAllUsers);
router.patch('/update-password', passwordChanged)

router.get('/:id',restrictTo("employee"), validateByMiddleware, findOneUser);
router.put('/:id', validateByMiddleware, protectUserAccount, updateUser);
router.delete('/:id', validateByMiddleware, protectUserAccount, erase);