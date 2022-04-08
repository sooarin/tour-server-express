'use strict';

import Joi from "joi";
import express from "express";
import jwt from "jsonwebtoken";
import passport from "passport";

import { MSG_KR, ERRCODE_KR } from "../../config/constants.js";
import UserService from "../../service/userService.js";
import { appLogger } from "../../logger/logger.js";


const router = express.Router();

const querySchema = Joi.object({
    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": MSG_KR.EMAIL_NOT_VALID,
            "string.empty": MSG_KR.EMAIL_EMPTY,
            "any.required": MSG_KR.EMAIL_REQUIRED
        }),
    passwd: Joi.string()
        .min(6)
        .required()
        .trim()
        .messages({
            "string.min": MSG_KR.PW_TOO_SHORT,
            "string.empty": MSG_KR.PW_EMPTY,
            "any.required": MSG_KR.PW_REQUIRED
        }),
    name: Joi.string()
        .required()
        .messages({
            "string.empty": MSG_KR.NAME_EMPTY,
            "any.required": MSG_KR.NAME_REQUIRED
        }),
})

export default {
    async signup(req, res, next) {
        const reqUser = {
            email: req.body.email,
            passwd: req.body.passwd,
            name: req.body.name,
        }
        const { error } = querySchema.validate(reqUser, {abortEarly: true});
        if(!error) {
            try {
                const user = await UserService.SignUp(reqUser);
                res.json({
                    success: true,
                    message: MSG_KR.SIGNUP_SUCCESSFUL
                })
            } catch (err) {
                if(err.code === 'P2002') {
                    appLogger(1).error({message: err.message})
                    return res.status(500).json({
                        success: false,
                        message: ERRCODE_KR.ERR00101
                    })
                }
                appLogger(1).error({message: err.message})
                res.status(500).json({
                    success: false,
                    message: ERRCODE_KR.ERR001
                })
            }
        }
        else {
            appLogger(1).error({message: error.message})
            res.status(422).json({
                success: false,
                message: error.message
            })
        }
    },

    async login(req, res, next) {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                appLogger(1).error({message: info ? info.message : 'Login failed'})
                return res.status(400).json({
                    message: ERRCODE_KR.ERR00202,
                    user   : user
                });
            }
            req.login(user, {session: false}, (error) => {
                if (error) {
                    appLogger(3).error({message: error})
                    return res.status(400).json({
                        message: ERRCODE_KR.ERR002,
                        user   : user
                    });
                }
                const token = jwt.sign(user, process.env.JWT_SECRET_KEY);

                const resUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
    
                return res.json({resUser, token, "user": "success"});
            });
        })
        (req, res);
    },
}