import { connectiondtb } from "../dtb/connection";
export default defineEventHandler(async (event) => {
    const requestbody = await readBody(event);
    const connection = await connectiondtb();
    let resolutfinal
    if (!requestbody.id) {
      const [data] = await connection.execute('SELECT * FROM users WHERE name=?',[requestbody.name]);
      const [followers] = await connection.execute('SELECT follower_id FROM followers WHERE user_id=?',[data[0].user_id]);
    const likes = await connection.execute('SELECT likes FROM post WHERE user_id=?',[data[0].user_id]);
      let soucet = 0
      console.log(likes[0].length)
      for (let i = 0;i < likes[0].length; i++) {
        soucet = soucet + likes[0][i].likes
      }
      console.log(soucet)
          await connection.end();
    resolutfinal = {likes: soucet,followers: followers.length, bio: data[0].bio,src: data[0].pfp_path,id: data[0].user_id}
    return resolutfinal
    } else {
    
      const [data] = await connection.execute('SELECT * FROM users WHERE user_id=?',[requestbody.id]);
      const [followers] = await connection.execute('SELECT follower_id FROM followers WHERE user_id=?',[data[0].user_id]);
    
      await connection.end();
    resolutfinal = {likes: 0,followers: followers.lenght, bio: data[0].bio,src: data[0].pfp_path,id: data[0].user_id}
    return resolutfinal
    
      
    
    }
})
