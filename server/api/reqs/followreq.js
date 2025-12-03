import { connectiondtb } from "../../dtb/connection";
import jwt from "jsonwebtoken";
export default defineEventHandler(async (event) => {
    const requestbody = await readBody(event);
    const connection = await connectiondtb();
    const fname = getCookie(event, 'auth_token')
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(fname, JWT_SECRET)
    try {
        const [ids] = await connection.execute('SELECT user_id FROM users WHERE name=?', [requestbody.name])
        if (requestbody.or) {
            const resolut = await connection.execute('INSERT INTO followers (user_id,follower_id) VALUES (?,?)',
            [ids[0].user_id, decoded.id])
        }else {
            const resolut = await connection.execute('DELETE FROM followers WHERE user_id = ? AND follower_id = ?', [ids[0].user_id, decoded.id])
        }
        connection.end()
    } catch(err) {
        connection.end()
    }
   
})