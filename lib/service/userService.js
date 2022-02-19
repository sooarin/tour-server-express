/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

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
                type: 1,
                passwd: password,
                salt: salt,
                social_key: null,
                name: null,
                phone: null,
                age: null,
                gender: null,
                profile_pic: null,
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