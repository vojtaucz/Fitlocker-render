import { connectiondtb } from "../dtb/connection";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const connection = await connectiondtb();
  const [resolut] = await connection.execute('SELECT * FROM post WHERE post_id = ?',[requestbody.id]);
  const [resolutuser] = await connection.execute('SELECT name FROM users WHERE user_id = ?',[resolut[0].user_id]);
  const [likecount] = await connection.execute('SELECT user_id FROM likes WHERE post_id=?',[requestbody.id]);
  connection.end();
  const jsontosend = {username: resolutuser[0].name,postname: resolut[0].name,description: resolut[0].description,date: resolut[0].date,src: resolut[0].post_path,likes: likecount.length}
  return jsontosend;
})
