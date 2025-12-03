import { connectiondtb } from "~~/server/dtb/connection";
import { writeFile,unlink,stat } from 'fs/promises'
import { join } from 'path'
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
    const requestbody = await readBody(event);
  const connection = await connectiondtb()
  const fname = getCookie(event, 'auth_token')
  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(fname, JWT_SECRET)
  const user_id = await connection.execute('SELECT user_id FROM post WHERE post_id = ?',[requestbody.post_id])
  if (decoded.id != user_id[0][0].user_id) {
      return 0;
  }
  const [deletefile] = await connection.execute('SELECT post_path FROM post WHERE post_id = ?',[requestbody.post_id])
  await connection.execute('DELETE FROM post WHERE post_id = ?', [requestbody.post_id])
  await unlink(join(process.cwd(), 'public', deletefile[0].post_path)); 
  return ;
})
