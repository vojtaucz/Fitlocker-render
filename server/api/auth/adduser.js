import bcrypt from 'bcrypt';
import { connectiondtb } from "../../dtb/connection";
export default defineEventHandler(async(event) => {
    const requestbody = await readBody(event);
    checkpassword(requestbody.password)
    emailcheck(requestbody.email)
    namecheck(requestbody.name)
    const connection = await connectiondtb()
    const hashedPassword = await bcrypt.hash(requestbody.password, 10);
    try {
        const resolut = await connection.execute('INSERT INTO users (name,email,password) VALUES (?,?,?)',[requestbody.name, requestbody.email, hashedPassword])
        await connection.end();
        return { success: true } 
    } catch(dberror) {
        await connection.end();
        throw createError({
            statusCode: 500,
            statusMessage: dberror.message || "Database error occurred"
    })
    }
})
export function checkpassword(password) {
        if (password.length < 5) {
        throw createError({
            statusCode: 500,
            statusMessage: "Password cannot be under 5 characters!",
        }) 
        }
        if (password.length > 75) {
            throw createError({
                statusCode: 500,
                statusMessage: "Password cannot be over 75 characters!",
            }) 
        }
}
export function emailcheck(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw createError({
            statusCode: 500,
            statusMessage: "Email doesnt have email structure!",
        }) 
        }
        if (email.length > 75) {
            throw createError({
                statusCode: 500,
                statusMessage: "Email cannot be over 75 characters!",
            }) 
        }
}
export function namecheck(name) {
        if (name.length < 3) {
        throw createError({
            statusCode: 500,
            statusMessage: "Name cannot be under 3 characters!",
        }) 
        }
        if (name.length > 75) {
            throw createError({
                statusCode: 500,
                statusMessage: "Name cannot be over 75 characters!",
            }) 
        }
}