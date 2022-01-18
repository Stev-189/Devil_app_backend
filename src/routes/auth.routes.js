import { Router } from "express";
import {check} from "express-validator";

import { createUser, loginUser, reToken } from "../controllers/auth.controllers";
import { validateBody } from "../middlewares/validateBody";
import { validateJWT } from "../middlewares/validateJWT";

const router = Router();

router.post('/api/auth',[
  //middleware
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required whith 6 character').isLength({min: 6}),
    validateBody
  ], createUser );

router.post('/api/login',[
  //middleware
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required whith 6 character').isLength({min: 6}),
    validateBody
  ], loginUser );

router.get('/api/login', validateJWT, reToken );

export default router;