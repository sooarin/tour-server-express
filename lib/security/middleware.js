/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

'use strict';

import passport from "passport";
import passportJWT from "passport-jwt";
import passportLocal from "passport-local";

import prisma from "../orm/prisma.js";
import { appLogger } from "../logger/logger.js";

import { makePasswordHashed } from "./password.js";
import { MSG_KR, ERRCODE_KR } from "../config/constants.js";

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'passwd'
    },
    async function (email, passwd, done) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                }
            });
            if (!user) {
                return done(null, false, { message: MSG_KR.ERROR_CHECK_IDPW });
            }
            const password = await makePasswordHashed(user.salt, passwd);
            if (password !== user.passwd) {
                return done(null, false, { message: MSG_KR.ERROR_CHECK_IDPW });
            }
            return done(null, user);
        } catch (err) {
            appLogger(2).error({message: err})
            return done(ERRCODE_KR.ERR002);
        }
    })
)

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY
    },
    async function (jwtPayload, done) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: jwtPayload.email,
                }
            });

            const resUser = {
                id: user.id,
                email: user.email,
                type: user.type,
                name: user.name,
                phone: user.phone,
                age: user.age,
                gender: user.gender,
                profile_pic: user.profile_pic
            }
            
            // There is no possiblity for null result.
            return done(null, resUser);
        } catch(err)  {
            appLogger(2).error({message: err})
            return done(err);
        }
    })
)