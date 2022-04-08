'use strict';

import express from "express";
import commentController from "./commentController.js";
import passport from "passport";

export const commentRoute = express.Router();

commentRoute.post('/', passport.authenticate('jwt', {session: false}), commentController.createComment);
commentRoute.put('/', passport.authenticate('jwt', {session: false}), commentController.updateComment);
commentRoute.delete('/:cid', passport.authenticate('jwt', {session: false}), commentController.removeComment);
commentRoute.get('/:tid', commentController.findAll);