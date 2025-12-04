import { connectiondtb } from "~~/server/dtb/connection";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const connection = await connectiondtb()
  const fname = getCookie(event, 'auth_token')
  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(fname, JWT_SECRET)
  const user_id = await connection.execute('SELECT user_id FROM comments WHERE comment_id = ?',[requestbody.comm_id])
  if (decoded.id != user_id[0][0].user_id) {
    return 0;
  }
  await connection.execute('DELETE FROM comments WHERE comment_id = ?', [requestbody.comm_id])
  connection.end();
  return ;
})
