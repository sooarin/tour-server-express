'use strict';

import express from "express";
import passport from "passport";
import likeController from "./likeController.js";

export const likeRoute = express.Router();

likeRoute.get('/:tid', passport.authenticate('jwt', { session: false}), likeController.createLike);
likeRoute.delete('/:lid', passport.authenticate('jwt', {session: false}), likeController.removeLike);
likeRoute.get('/', passport.authenticate('jwt', {session: false}), likeController.getLikes);