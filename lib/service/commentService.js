'use strict';

import { appLogger } from "../logger/logger.js";
import prisma from "../orm/prisma.js";

export default {
    async createComment(comments) {
        const createComment = await prisma.comment.create({
            data: {
                uid: comments.uid,
                tid: comments.tid,
                comment: comments.comment,
            }
        })
        return createComment;
    },

    async updateComment(comments) {
        const updateComment = await prisma.comment.update({
            where: {
                id: comments.cid,
            },
            data: {
                comment: comments.comment,
            }
        })
        return updateComment;
    },
    async removeComment(comments, base) {
        const id = parseInt(comments, base);
        const removeComment = await prisma.comment.delete({
            where: {
                id: id
            }
        })
        return removeComment;
    },

    async findOne(comments, base) {
        const id = parseInt(comments.cid, base);
        console.log(id);
        const findUser = await prisma.comment.findUnique({
            where: {
                id: id,
            }
        })
        return findUser;
    },

    async findAll(tid, base) {
        const id = parseInt(tid, base);
        const comments = await prisma.comment.findMany({
            where: {
                tid: id,
            }
        })
        return comments;
    }
}