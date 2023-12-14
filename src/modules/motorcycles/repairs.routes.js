import express from 'express';

import {
    findAll,
    findOne,
    create,
    update,
    cancel
} from './repairs.controllers.js';
import { validateStatusPending } from './middlewares/status.middleware.js';

export const repairRoute = express.Router();

repairRoute.post('/', create);

// repairRoute.use(protect);

repairRoute.get('/', findAll);
repairRoute.route('/:id', validateStatusPending)
.get(findOne)
.patch(update)
.delete(cancel)
