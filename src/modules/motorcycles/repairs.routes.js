import express from 'express';

import {
    findAll,
    findOne,
    create,
    update,
    cancel
} from './repairs.controllers.js';

import { protect, restrictTo } from '../middleware/protect.middleware.js';

export const repairRoute = express.Router();

repairRoute.post('/', create);

repairRoute.use(protect);

repairRoute.get('/',restrictTo('employee'), findAll);
repairRoute.route('/:id')
.get(restrictTo('employee'), findOne)
.patch(restrictTo('employee'), update)
.delete(restrictTo('employee'), cancel)
