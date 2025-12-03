import { connectiondtb } from "~~/server/dtb/connection"

export default defineEventHandler(async (event) => {
  const connection = await connectiondtb()
  const requestbody = await readBody(event)
  try {
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const resolut = await connection.execute('INSERT INTO reports (user_id,idofreported,typeofreport,message,created_at,reason) VALUES (?,?,?,?,?,?)',[requestbody.user_id, requestbody.idofreported, requestbody.typeof,requestbody.message,date,requestbody.reason])
    connection.end()
    return {state: true,mess: null};
  } catch(err) {
    connection.end()
    return {state: false,mess: err};
  }
})
