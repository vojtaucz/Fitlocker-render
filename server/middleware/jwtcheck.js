import jwt from 'jsonwebtoken';
export default defineEventHandler(async(event)=>{
    if (event.path.startsWith('/api/logonly') ||event.path.startsWith('/api/reqs') ) {
    const token = getCookie(event, 'auth_token')
     if (!token) {
      throw createError({ 
        statusCode: 401, 
        message: 'Not authenticated' 
      })
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      event.context.user = decoded
    } 
    catch (error) {
      throw createError({ 
        statusCode: 401, 
        message: 'Invalid or expired token' 
      })
    }
  }
})