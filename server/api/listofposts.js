import { connectiondtb } from "../dtb/connection";

export default defineEventHandler(async(event) => {
    const connection = await connectiondtb();
    const [resolut] = await connection.execute('SELECT post_id FROM post');
    await connection.end();
    return resolut

})