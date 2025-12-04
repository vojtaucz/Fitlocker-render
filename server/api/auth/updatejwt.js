import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const token = getCookie(event, 'auth_token')
    
    if (!token) {
      return { authenticated: false, user: null }
    }
  const JWT_SECRET = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, JWT_SECRET)
  const signtoken = jwt.sign(
        { 
            id: decoded.id, 
            name: requestbody.name ,
            pfp: decoded.pfp
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
