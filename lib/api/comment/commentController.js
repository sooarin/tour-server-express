import express from "express";
import { ERRCODE_KR } from "../../config/constants.js";
import { appLogger } from "../../logger/logger.js";
import CommentService from "../../service/commentService.js";
import tourService from "../../service/tourService.js";

const router = express.Router();

export default {
    async createComment(req, res, next) {
        const reqComment = {
            uid: req.user.id,
            tid: req.body.tid,
            comment: req.body.comment,
        }
        try {
            const comment = await CommentService.createComment(reqComment);
            res.json({
                comment
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003
            })
        }
    },
    
    async updateComment(req, res, next) {
        const reqComment = {
            uid: req.user.id,
            cid: req.body.cid,
            comment: req.body.comment
        }
        try {
            const userCheck = await CommentService.findOne(reqComment);
            if(userCheck.uid != reqComment.uid) {
                appLogger(4).error({message: 'user not match'})
                res.status(403).json({
                    success: false,
                    message: ERRCODE_KR.ERR004,
                })
            }
            const updateComment = await CommentService.updateComment(reqComment);
            res.json({
                updateComment
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003,
            })
        }
    },

    async findAll(req, res, next) {
        const tid = req.params.tid;

        try {
            const existCheck = await tourService.findOne(tid);
            if(!existCheck) {
                return res.status(404).json({
                    success: false,
                    message: ERRCODE_KR.ERR005
                })
            }
            const comments = await CommentService.findAll(tid);
            res.json({
                comments
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003
            })
        }
    },

    async removeComment(req, res, next) {
        const reqComment = {
            uid: req.user.id,
            cid: req.params.cid,
        }
        try {
            const userCheck = await CommentService.findOne(reqComment);
            if(!userCheck) {
                appLogger(4).error({message: 'comment not found'})
                return res.status(400).json({
                    success: false,
                    message: ERRCODE_KR.ERR005,
                })
            }
            if(userCheck.uid != reqComment.uid) {
                appLogger(4).error({message: 'user not match'})
                return res.status(403).json({
                    success: false,
                    message: ERRCODE_KR.ERR004,
                })
            }
            const removeComment = await CommentService.removeComment(reqComment.cid);
            res.json({
                success: true,
                message: '성공적으로 삭제되었습니다.'
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003
            })
        }
    },

}