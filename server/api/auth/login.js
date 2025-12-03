import { connectiondtb } from "../../dtb/connection"
import jwt from 'jsonwebtoken';
import { setCookie } from 'h3' 
import bcrypt from 'bcrypt';

export default defineEventHandler(async(event) =>{

    const requestbody = await readBody(event);
    const connection = await connectiondtb()
    const JWT_SECRET = process.env.JWT_SECRET;
    try {
        const [resolut] = await connection.execute('SELECT * FROM users WHERE email = ?',[requestbody.email]);
        await connection.end();

        if (resolut.length === 0) {
            throw createError({
                statusCode: 401,
                message: 'Invalid email or password!'
            });
        }

        const isPasswordValid = await bcrypt.compare(requestbody.password,resolut[0].password);

        if (!isPasswordValid) {
            throw createError({
                statusCode: 401,
                message: 'Invalid email or password!'
            });
        }
        const token = jwt.sign(
        { 
            id: resolut[0].user_id,
            name: resolut[0].name 
        },JWT_SECRET,{ expiresIn: '1d' })
        setCookie(event, 'auth_token', token, {
            httpOnly: true,   
            secure: process.env.NODE_ENV === 'production',  
            sameSite: 'strict',  
            maxAge: 60 * 60 * 24,  
            path: '/'
        })
  

        return {
            success: true,
            token: token
        };

    }
    catch (error) {
        await connection.end();
    if (error.statusCode) {
        throw error;
    }
    throw createError({
        statusCode: 500,
        message: error.message || 'Login failed'
    })
    }

})