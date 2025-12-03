import { connectiondtb } from "../dtb/connection";

export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const connection = await connectiondtb();
  console.log(requestbody.id)
  const [commentinfo] =await connection.execute("SELECT message,user_id FROM comments WHERE comment_id=?",[requestbody.id])
  const [name] =await connection.execute("SELECT name FROM users WHERE user_id=?",[commentinfo[0].user_id])
  connection.end()
  return {commentinfo: commentinfo,name:name};
})
