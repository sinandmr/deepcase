import express from 'express';
const router = express.Router();

import Login from '../services/Login.js';
import Register from '../services/Register.js';

router.route('/user/login').post(Login);
router.route('/user/register').post(Register);

export default router;
