import { connectiondtb } from "~~/server/dtb/connection";

export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event)
  const connection = await connectiondtb()
  if (!requestbody.id) {
    const [id] = await connection.execute('SELECT pfp_path FROM users WHERE name=?',[requestbody.name])
    connection.end()
    return id[0].pfp_path
  }else {
    const [data] = await connection.execute('SELECT pfp_path FROM users WHERE user_id=?',[requestbody.id]);
    connection.end()
    console.log(data)
    return data[0].pfp_path
  }
})
