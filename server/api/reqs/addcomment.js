import { connectiondtb } from "~~/server/dtb/connection"
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event)
  const fname = getCookie(event, 'auth_token')
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
  const decoded = jwt.verify(fname, JWT_SECRET)
  const connection = await connectiondtb()
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
  connection.execute('INSERT INTO comments (user_id, post_id, created_at, message) VALUE (?,?,?,?)', [
    decoded.id,requestbody.post_id,date,requestbody.message
  ])
  connection.end()
  return true
  } catch(err) {
    connection.end()
    return false
  }
})
