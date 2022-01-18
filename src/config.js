import { config as dotenv} from 'dotenv';
import path from "path";
import fs from "fs";

dotenv({
  path: (fs.existsSync(path.join(__dirname, '../.env.local')))
        ? path.join(__dirname, '../.env.local')
        : path.join(__dirname, '../.env')
}); //lee las variables de entorno

export const configDB ={
  host: process.env.DEVIL_APP_HOST,
  user: process.env.DEVIL_APP_DB_USER,
  password: process.env.DEVIL_APP_DB_PASSWORD,
  database: process.env.DEVIL_APP_DB,
  //socketPath: 'mysql-socket-path'/// linea para corregir error de docker
};

export const PORT = process.env.PORT;

//JWT secret
export const JWT_SECRET = process.env.JWT_SECRET;