import express from 'express';
import { router as endpointUsers } from '../modules/users/staff.routes.js'; // ojo
import { repairRoute as endpointRepair } from '../modules/motorcycles/repairs.routes.js';

export const router = express.Router();

router.use('/users', endpointUsers);
router.use('/repairs', endpointRepair)