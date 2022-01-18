import moment from "moment"

export const validateDate= (value) => {
  if(!value){ return false }
  return moment(value).isValid()
}

export const validateHora= (value) => {
  if(!value){ return false }
  return value.match(/^[0-2][0-3]:[0-5][0-9]$/)
}