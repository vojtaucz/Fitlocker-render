import { connectiondtb } from "../dtb/connection";
export default defineEventHandler(async (event) => {
  const requestbody = await readBody(event);
    const connection = await connectiondtb();
    const [resolut] = await connection.execute('SELECT user_id FROM users WHERE name=?',[requestbody.name]);
    const [postids] = await connection.execute('SELECT post_id FROM post WHERE user_id = ? ORDER BY likes DESC', [resolut[0].user_id]) //ORDER BY likes ASC
    const posts = {1: postids[1],2: postids[2],3: postids[3],4: postids[4],5: postids[5]}
    for (let i = 0; i < Math.min(postids.length, 5); i++) {
      posts[i + 1] = postids[i].post_id;
    } 
    return posts
})
