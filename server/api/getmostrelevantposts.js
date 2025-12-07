import { connectiondtb } from "../dtb/connection";
export default defineEventHandler(async (event) => {
  const connection = await connectiondtb();
  const requestbody = await readBody(event);
  const query = requestbody.listofparams
  const conditions = [];
  const params = [];
  let colors
  if (query.colors) {
    colors = query.colors.split(',').map(c => c.trim());
  } 
  let style
  if (query.style) {
    style = query.style.split(',').map(c => c.trim());
  } 
  let Topcolors
  if (query.topcolor) {
    Topcolors = query.topcolor.split(',').map(c => c.trim());
  } 
   let Bottomcolors
  if (query.bottomcolor) {
    Bottomcolors = query.bottomcolor.split(',').map(c => c.trim());
  } 
  if (query.style) {
    conditions.push('Style IN (?)');
    params.push(style);
  }
  
  if (query.gender) {
    conditions.push('gender = ?');
    params.push(query.gender);
  }
  
  if (query.body_shape) {
    conditions.push('body_shape = ?');
    params.push(query.body_shape);
  }
  
  if (query.colors) {
    conditions.push('(top_color IN (?) OR bottom_color IN (?))');
    params.push(colors, colors);
  }
  
  if (query.topcolor) {
    conditions.push('top_color IN (?)');
    params.push(Topcolors);
  }
  
  if (query.bottomcolor) {
    conditions.push('bottom_color IN (?)');
    params.push(Bottomcolors);
  }
  
  const rawsql = conditions.length > 0 
    ? 'WHERE ' + conditions.join(' AND ') 
    : '';
  
  const sql = `
    SELECT post.post_id from post
    ${rawsql}
    ORDER BY likes DESC, date DESC
  `;
  const posts = await connection.query(sql, params) 
  return posts;
});

