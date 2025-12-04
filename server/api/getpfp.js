import { connectiondtb } from "~~/server/dtb/connection";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event)
  const connection = await connectiondtb()
  // Pridane s Jwt decodem kvuli pomalosti 2 fetchu
  if (requestbody.jwtway) {
    const token = getCookie(event, 'auth_token')
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const decoded = jwt.verify(token, JWT_SECRET) 
        const [id] = await connection.execute('SELECT pfp_path FROM users WHERE user_id=?',[decoded.id])
        connection.end()
        console.log(id[0].pfp_path)
        return id[0].pfp_path;
    }catch(err) {
      connection.end()
      return ;
    }
  }
  // pokud se zde posila id tak to radsi vezme id kvuli rychlosti
  if (!requestbody.id) {
    const [id] = await connection.execute('SELECT pfp_path FROM users WHERE name=?',[requestbody.name])
    connection.end()
    return id[0].pfp_path
  }else {
    const [data] = await connection.execute('SELECT pfp_path FROM users WHERE user_id=?',[requestbody.id]);
    connection.end()
    return data[0].pfp_path
  }
})
