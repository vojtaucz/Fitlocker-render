import { connectiondtb } from "~~/server/dtb/connection"
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
      if (!token) {
        throw createError({
          statusCode: 401,
          message: 'Not authenticated'
        })
      }
      const JWT_SECRET = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, JWT_SECRET)
      const requestbody = await readBody(event);
      const connection = await connectiondtb()
      const [followCheck] = await connection.execute(
        'SELECT * FROM likes WHERE post_id=? AND user_id=?',
        [requestbody.post_id,decoded.id]
      );
      connection.end()
      return followCheck.length > 0
})
