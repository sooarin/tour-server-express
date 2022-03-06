'use strict';

import prisma from "../orm/prisma.js";
import { createHashedPassword } from "../security/password.js";

export default {
    async SignUp(user) {
        const { password, salt } = await createHashedPassword(user.passwd);
        console.log(password + "/" + salt)
        const userRecord = prisma.user.create({
            data: {
                // TODO : Add center signup feature
                // TODO : Add social signup feature
                email: user.email,
                passwd: password,
                salt: salt,
                name: user.name,
            }
        })
        return userRecord;
    },
    async ModifyUser() { throw new Error('EXCEPTION_NOT_IMPLEMENTED') },
    async GetUser() { throw new Error('EXCEPTION_NOT_IMPLEMENTED') },
    async DeleteUser() { throw new Error('EXCEPTION_NOT_IMPLEMENTED') },
    async SendEmail() { throw new Error('EXCEPTION_NOT_IMPLEMENTED') },
    async VerifyEmail() { throw new Error('EXCEPTION_NOT_IMPLEMENTED') }
}