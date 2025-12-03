import { connectiondtb } from "~~/server/dtb/connection"
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const connection = await connectiondtb();
  const fname = getCookie(event, 'auth_token')
  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(fname, JWT_SECRET)
  const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const likes = await connection.execute('SELECT user_id FROM likes WHERE post_id=?',[requestbody.post_id]);
    if (requestbody.or) {
      const resolut = await connection.execute('INSERT INTO likes (user_id,post_id,created_at) VALUES (?,?,?)',
      [decoded.id,requestbody.post_id,date])
      const pluslikes = await connection.execute('UPDATE post SET likes = ? WHERE post_id = ?',
      [likes[0].length + 1,requestbody.post_id])
    }else {
      const pluslikes = await connection.execute('UPDATE post SET likes = ? WHERE post_id = ?',
      [likes[0].length - 1,requestbody.post_id])
      const resolut = await connection.execute('DELETE FROM likes WHERE user_id = ? AND post_id = ?', [ decoded.id,requestbody.post_id])
    }
      connection.end()
      try {
    } catch(err) {
      connection.end()
    }
       
})
