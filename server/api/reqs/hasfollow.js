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
    const currentUserId = decoded.id

    const requestbody = await readBody(event);
    const connection = await connectiondtb()
    
    const [userResult] = await connection.execute(
      'SELECT user_id FROM users WHERE name=?',
      [requestbody.user]
    );
  
    if (!userResult || userResult.length === 0) {
      connection.end()
      return false
    }
    const targetUserId = userResult[0].user_id
    const [followCheck] = await connection.execute(
      'SELECT * FROM followers WHERE follower_id=? AND user_id=?',
      [currentUserId, targetUserId]
    );
    connection.end()
    return followCheck.length > 0
})