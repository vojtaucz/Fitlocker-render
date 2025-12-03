import { connectiondtb } from "../../dtb/connection";
import { writeFile,unlink,stat } from 'fs/promises'
import { join } from 'path'
export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
    const file = formData.find(item => item.name === 'file');
    const name = formData.find(item => item.name === 'name')?.data;
    const newname = formData.find(item => item.name === 'newname')?.data;
    const id = formData.find(item => item.name === 'id')?.data.toString();
    const bio = formData.find(item => item.name === 'bio').data;
    console.log(bio.toString())
    if (newname != name && name) {
      const nameconnection = await connectiondtb();
      try {
      const [request] = await nameconnection.execute('UPDATE users SET name = ? WHERE user_id = ?',[newname,id])
      nameconnection.end()
    }
    catch (err) {
      console.log(err)
      nameconnection.end()
    }
    }
    if (bio) {
      const bioconnection = await connectiondtb();
      try {
        const [request] = await bioconnection.execute('UPDATE users SET bio = ? WHERE user_id = ?',[bio,id])
        bioconnection.end()
      }
      catch (err) {

        bioconnection.end()
      }
    }
    if (file) {
      const pfpconnection = await connectiondtb();

        const ext = file.filename.substring(file.filename.lastIndexOf('.'))

        const finalFilename = `${id}${ext}`

        const uploadDir = join(process.cwd(), 'public', 'uploads/profilepics')

        const filePath = join(uploadDir, finalFilename)

        const [deletefile] = await pfpconnection.execute('SELECT pfp_path FROM users WHERE user_id = ?',[id])

        await writeFile(filePath, file.data);

        const filesize = await stat(filePath);
        if (filesize.size > 4000000) {

          await unlink(filePath); 

          throw createError({
            statusCode: 400,
            statusMessage: 'File is too big!',
          })
        }else {

          if (deletefile[0].pfp_path == null) {

            const [request] = await pfpconnection.execute('UPDATE users SET pfp_path = ? WHERE user_id = ?',[`/uploads/profilepics/${finalFilename}`,id])
          }
          else {
            if (join(process.cwd(), 'public', deletefile[0].pfp_path) != filePath) {

              await unlink(join(process.cwd(), 'public', deletefile[0].pfp_path)); 

              const [request] = await pfpconnection.execute('UPDATE users SET pfp_path = ? WHERE user_id = ?',[`/uploads/profilepics/${finalFilename}`,id])
            }
          }
        }
        
        pfpconnection.end()
      try {} 
      catch(err) {
        pfpconnection.end()
      }
    }
})
