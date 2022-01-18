import {response} from "express"
import jwt from "jsonwebtoken";

import { configDB, JWT_SECRET } from "../config";
import { connect } from "../database";
import { decrypt, encrypt } from "../helpers/crypt";

export const createUser = async (req, res=response) => {
  const {name, email, password} = req.body;
  const crypPass = await encrypt(password);

  try {
    const connection = await connect(configDB);
    const [existUser] = await connection.query('SELECT * FROM tb_users WHERE userEmail = ?',[email])
    connection.end();
    if(existUser.length > 0){throw new Error(`el correo ${email} ya fue usado`)}

    const connections= await connect(configDB);
    const [registerNewUser] = await connections.query('INSERT INTO tb_users(userName, userEmail, password) VALUES (?,?,?)', [name, email, crypPass]);
    connections.end();//cerramos la conexion
    if(!(registerNewUser.insertId)){throw new Error(`Error ${name} no fue creado`)}

    const token = jwt.sign({userEmail: email, userName: name, id: registerNewUser.insertId}, JWT_SECRET, {expiresIn: 43200});
    
    return res.status(201).json({
      result: true,
      msg: 'User created successfully',
      data: {
        id: registerNewUser.insertId,
        name,
        email,
        token
      }
    })

  } catch (error) {
    return res.status(500).json({
      result: false,
      msg: error.message,
      error
    })
  }
} 

export const loginUser = async (req, res=response) => {
  const {email, password} = req.body;

  try {
    const connection = await connect(configDB);
    const [existUser] = await connection.query('SELECT * FROM tb_users WHERE userEmail = ?',[email])
    connection.end();
    if(existUser.length === 0){throw new Error(`Usuario o Password son incorrectos`)}
    const passwordIsValid = await decrypt(password, existUser[0].password);
    if(!passwordIsValid){throw new Error(`Usuario o Password son incorrectos`)}
    const token = jwt.sign({userEmail: existUser[0].userEmail, userName: existUser[0].userName, id:existUser[0].id }, JWT_SECRET, {expiresIn: 43200});

    return res.status(201).json({
      result: true,
      msg: 'User logged in successfully',
      data: {
        id: existUser[0].id,
        name: existUser[0].userName,
        email: existUser[0].userEmail,
        token
      }
    })

  } catch (error) {
    return res.status(400).json({
      result: false,
      msg: error.message,
      error
    })
  }
}

export const reToken = async (req, res=response) => {
  const {userEmail, userName, id} = req;
  const token = jwt.sign({userEmail, userName, id }, JWT_SECRET, {expiresIn: 43200});
  return res.json({
    result: true,
    msg: 'User logged in successfully',
    data: {
      name: userName,
      email: userEmail,
      token
    }
  })
}
