import bcrypt from 'bcryptjs'

export const encrypt = async (pass)=>{
  const salt = await bcrypt.genSalt(11);
  return await bcrypt.hash(pass, salt)
}

export const decrypt = async (pass, passDB)=> await bcrypt.compare(pass, passDB)