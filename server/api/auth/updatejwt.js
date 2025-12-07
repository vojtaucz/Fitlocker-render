import jwt from "jsonwebtoken";
import { connectiondtb } from "~~/server/dtb/connection";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const token = getCookie(event, 'auth_token')
  const connection = await connectiondtb();
    
    if (!token) {
      return { authenticated: false, user: null }
    }
  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, JWT_SECRET)
  const [pfp] = await connection.execute('SELECT pfp_path FROM users WHERE user_id = ?',[decoded.id])
  const signtoken = jwt.sign(
        { 
            id: decoded.id, 
            name: requestbody.name ,
            pfp: pfp[0].pfp_path
        },JWT_SECRET,{ expiresIn: '1d' })
        setCookie(event, 'auth_token', signtoken, {
            httpOnly: true,   
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict',  
            maxAge: 60 * 60 * 24,  
            path: '/'
        })
        return {
            success: true,
            token: signtoken
        };
})
