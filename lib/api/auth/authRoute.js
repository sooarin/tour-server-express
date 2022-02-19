/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

'use strict';

import express from "express";

import authController from "./authController.js";

export const authRoute = express.Router();

authRoute.post('/signup', authController.signup);
authRoute.post('/login', authController.login);
  