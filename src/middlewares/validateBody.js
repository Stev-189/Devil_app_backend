import {response} from "express"
import { validationResult } from "express-validator";

export const validateBody = (req, res=response, next) => {
  //validate result
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({
      result: false,
      errors: errors.mapped(),
      msg: 'Error en la socilitud de datos' 
    });
  }
  next();
}