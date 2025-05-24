import { Router } from 'express';
import { createUser, getUsers } from '../controllers/userController';
import { validateUser } from '../middleware/validation/userValidation';

const router = Router();

router.post('/receiver', validateUser, createUser);
router.get('/users', getUsers);

export default router; 