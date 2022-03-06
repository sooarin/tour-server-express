'use strict';

import express from "express";
import { ERRCODE_KR } from "../../config/constants.js";
import { appLogger } from "../../logger/logger.js";
import likeService from "../../service/likeService.js";
import LikeService from "../../service/likeService.js";

const router = express.Router();

export default {
    async createLike(req, res, next) {
        const reqLike = {
            uid: req.user.id,
            tid: req.params.tid,
        }
        try {
            const createLike = await LikeService.createLike(reqLike);
            res.json({
                success: true,
                message: '관광지를 좋아요 설정 하였습니다.'
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003,
            })
        }
    },

    async removeLike(req, res, next) {
        const reqLike = {
            uid: req.user.id,
            tid: req.params.tid,
        }
        try {
            const removeLike = await likeService.removeLike(reqLike);
            res.json({
                success: true,
                message: '관광지 좋아요를 해제 하였습니다.'
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003,
            })
        }
    },

    async getLikes(req, res, next) {
        const like = req.user.id;
        try {
            const getLikes = await LikeService.getLikes(like);
            res.json({
                getLikes
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003
            })
        }
    }
}