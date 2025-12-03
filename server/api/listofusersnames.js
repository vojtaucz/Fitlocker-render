import { connectiondtb } from "../dtb/connection";

export default defineEventHandler(async(event) => {
    const connection = await connectiondtb();
    const [resolut] = await connection.execute('SELECT name FROM users');
    await connection.end();
    return resolut

})