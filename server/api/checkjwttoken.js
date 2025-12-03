import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')
  
  if (!token) {
    return { authenticated: false, user: null }
  }
  
  const JWT_SECRET = process.env.JWT_SECRET;
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return { 
      loggedin: true, 
      name: decoded.name,
      id: decoded.id
    }
  } catch (error) {
    return { loggedin: false, user: null }
  }
})