import { connectiondtb } from "../dtb/connection"

export default defineEventHandler(async (event) => {
  const connection = await connectiondtb()
  const postids = await connection.execute('SELECT post_id FROM post ORDER BY RAND() LIMIT 25')
    return postids
})
