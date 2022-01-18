import mysql from "mysql2/promise";

export const connect = async (bd) => await mysql.createConnection(bd);