import { connectiondtb } from "~~/server/dtb/connection";

export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
  const connection = await connectiondtb()
  const [comments] = await connection.execute("SELECT comment_id FROM comments WHERE post_id=?", [requestbody.id])
  return comments;
})
