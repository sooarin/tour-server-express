'use strict';

import express from "express";

import authController from "./authController.js";

export const authRoute = express.Router();

authRoute.post('/signup', authController.signup);
authRoute.post('/login', authController.login);
  