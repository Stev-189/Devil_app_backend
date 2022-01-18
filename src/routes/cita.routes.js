import { Router } from "express";
import {check} from "express-validator";

import { validateDate, validateHora } from "../helpers/validateDate";
import { validateBody } from "../middlewares/validateBody";
import { validateJWT } from "../middlewares/validateJWT";
import { deleteCita, getCitas, postCita, putCita } from "../controllers/cita.controllers";

const router = Router();

router.use(validateJWT);

router.get('/api/cita', getCitas);

router.post('/api/cita',[
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'date start is required').custom(validateDate),
  check('end', 'date end is required').custom(validateDate),
  check('date', 'date is required').custom(validateDate),
  check('hora', 'specify hora ("HH:mm") is required').custom(validateHora),
  validateBody
], postCita);

router.put('/api/cita/:id',[
  check('title', 'Title is required').not().isEmpty(),
  check('start', 'date start is required').custom(validateDate),
  check('end', 'date end is required').custom(validateDate),
  check('date', 'date is required').custom(validateDate),
  check('hora', 'specify hora ("HH:mm") is required').custom(validateHora),
  validateBody
], putCita);

router.delete('/api/cita/:id', deleteCita);

export default router;