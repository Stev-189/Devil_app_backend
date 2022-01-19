import { configDB } from "../config";
import { connect } from "../database";

export const getCitas = async (req, res) => {
  try {
    const connection = await connect(configDB);
    const [citas]= await connection.query('SELECT * FROM tb_citas');
    connection.end();
    if(citas.length === 0){throw new Error(`Not have citas`)}
    return res.status(200).json({
      result: true,
      msg: 'Get all Citas',
      data: citas
    })
  } catch (error) {
    return res.status(400).json({
      result: false,
      msg: error.message,
      error
    })
  }
}

export const postCita = async (req, res) => {
  const {title, start, end, date, hora} = req.body;
  const {userEmail, userName, id: userId} = req;
  try {
    const connection = await connect(configDB);
    const [existCita]= await connection.query('SELECT * FROM tb_citas WHERE start= ?',[start]);
    connection.end();
    if(existCita.length > 0){throw new Error(`Hour for this date is already booked`)}

    const connection2 = await connect(configDB);
    const [saveCita] = await connection2.query('INSERT INTO tb_citas (title, start, end, date, hora, userEmail, userName, userId) VALUES (?,?,?,?,?,?,?,?)',[title, start, end, date, hora, userEmail, userName, userId]);
    connection2.end();
    if(!(saveCita.insertId)){throw new Error(`Error saving the Hour`)}
    return res.status(201).json({
      result: true,
      msg: 'Hour saved successfully',
      data: {
        id: saveCita.insertId,
        title,
        start,
        end,
        date,
        hora,
        userEmail,
        userName,
        userId
      }
    })
    
  } catch (error) {
    return res.status(401).json({
      result: false,
      msg: error.message,
      error
    })
  }
}

export const putCita = async (req, res) => {
  const {title, start, end, date, hora} = req.body;
  const {userEmail, userName, id:userId} = req;
  try {
    if(!(req.params.id)){throw new Error(`id cita is required`)}
    const {id} = req.params;

    const conne = await connect(configDB);
    const [ownerCita]= await conne.query('SELECT * FROM tb_citas WHERE id= ? ',[id]);
    conne.end();
    if(ownerCita[0].userId !== userId){throw new Error(`You can't update this hour`)}

    const connection = await connect(configDB);
    const [existCita]= await connection.query('SELECT * FROM tb_citas WHERE start= ? AND id !=? ',[start, id]);
    connection.end();
    if(existCita.length > 0){throw new Error(`Hour for this date is already booked`)}

    const connection2 = await connect(configDB);
    const [updateCita] = await connection2.query('UPDATE tb_citas SET title=?, start=?, end=?, date=?, hora=?, userEmail=?, userName=?, userId=? WHERE id=?',[title, start, end, date, hora, userEmail, userName, userId, id]);
    connection2.end();
    if(!(updateCita.affectedRows)){throw new Error(`Error updating the Hour`)}
    return res.status(200).json({
      result: true,
      msg: 'Hour updated successfully',
      data: {
        id,
        title,
        start,
        end,
        date,
        hora,
        userEmail,
        userName,
        userId
      }
    })
    
  } catch (error) {
    return res.status(401).json({
      result: false,
      msg: error.message,
      error
    })
  }
}

export const deleteCita = async (req, res) => {
  const {id:userId} = req;
  try {
    if(!(req.params.id)){throw new Error(`id cita is required`)}
    const {id} = req.params;

    const conne = await connect(configDB);
    const [ownerCita]= await conne.query('SELECT * FROM tb_citas WHERE id= ? ',[id]);
    conne.end();
    if(ownerCita[0].userId !== userId){throw new Error(`You can't delete this hour`)}

    const connection = await connect(configDB);
    const [deleteCita]= await connection.query('DELETE FROM tb_citas WHERE id =? ',[id]);
    connection.end();
    if(!(deleteCita.affectedRows)){throw new Error(`Error deleting the Hour`)}
    return res.status(200).json({
      result: true,
      msg: 'Delete Hour successfully',
      data: {
        id
      }
    })
  } catch (error) {
    return res.status(401).json({
      result: false,
      msg: error.message,
      error
    })
  }
}