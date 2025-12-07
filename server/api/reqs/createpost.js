import { writeFile,stat,unlink } from 'fs/promises'
import { join } from 'path'
import { connectiondtb } from "../../dtb/connection";
import jwt from 'jsonwebtoken';
export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event)
    const connection = await connectiondtb();
    if (!formData) {
      throw createError({
        statusCode: 400,
        message: 'No file uploaded'
      })
    }
    const file = formData.find(item => item.name === 'file');
    const name = formData.find(item => item.name === 'name');
    const desc = formData.find(item => item.name === 'desc');
    const topcolor = formData.find(item => item.name === 'topcolor');
    const bottomcolor = formData.find(item => item.name === 'bottomcolor');
    const style = formData.find(item => item.name === 'style');
    const bodyshape = formData.find(item => item.name === 'bodyshape');
    let gender = formData.find(item => item.name === 'gender');
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    let user = null
    const token = getCookie(event, 'auth_token')
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      user = decoded.id
    } catch(err) {
    } 
    if (!file) {
      throw createError({
        statusCode: 400,
        message: 'File not found in request'
      })
    }
    const ext = file.filename.substring(file.filename.lastIndexOf('.'))
    const uploadDir = join(process.cwd(), 'public', 'uploads/posts')
    const nameValue = name?.data.toString() || ''
    const descValue = desc?.data.toString() || ''
    const top_color = topcolor.data.toString('utf8');
    const bottom_color = bottomcolor.data.toString('utf8');
    const style_ = style.data.toString('utf8');
    gender = gender.data.toString('utf8');
    const body_shape = bodyshape.data.toString('utf8');
    const [request] = await connection.execute(
'INSERT INTO post (description,user_id,post_path,date,name,likes,top_color,bottom_color,Style,gender,body_shape) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
  [descValue, user, '', date, nameValue,0,top_color,bottom_color,style_,gender,body_shape])
    connection.end()
    const id = request.insertId
    const finalFilename = `${id}${ext}`
    const filePath = join(uploadDir, finalFilename)
    const connection2 = await connectiondtb();
    await writeFile(filePath, file.data)
    const filesize = await stat(filePath);
    if (filesize.size > 7000000) {

      await unlink(filePath); 
      await connection2.execute('DELETE FROM post WHERE post_id = ?', [id])
      throw createError({
        statusCode: 400,
        statusMessage: 'File is too big!',
      })
    }else {
      const [req] = await connection2.execute(
      'UPDATE post SET post_path = ? WHERE post_id = ?',
      [`/uploads/posts/${finalFilename}`, id]
    )
    }
    connection2.end()

    return {
      id: id,
      success: true,
      filename: file.filename,
      size: file.data.length,
      path: filePath
    }
  try {  
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error.message || 'File upload failed'
    })
  }
})
