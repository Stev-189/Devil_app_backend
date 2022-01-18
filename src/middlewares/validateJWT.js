import {response} from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const validateJWT = (req, res=response, next) => {

  const token = req.headers['x-access-token'];
  if(!token){
    return res.status(401).json({
      result: false,
      msg: 'No token provided'
    })
  }

  try {
    const {userEmail, userName, id} = jwt.verify(token, JWT_SECRET);
    req.userEmail = userEmail;
    req.userName = userName;
    req.id = id;
    next();
  } catch (error) {
    return res.status(500).json({
      result: false,
      msg: "Failed to authenticate token",
      error
    })
  }

}