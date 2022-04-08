'use strict';

import { ERRCODE_KR } from "../config/constants.js";
import prisma from "../orm/prisma.js";

export default {
    async createLike(like, base) {
        const id = parseInt(like.tid, base);
        const createLike = await prisma.likes.create({
            data: {
                uid: like.uid,
                tid: id,
            }
        })
        return createLike;
    },

    async findLikeOne(like, base) {
        const tid = parseInt(like.tid, base);
        const findOne = await prisma.likes.findFirst({
            where: {
                uid: like.uid,
                tid: tid,
            }
        })
        return findOne;
    },

    async removeLike(lid) {
        const removeLike = await prisma.likes.delete({
            where: {
                id: lid
            }
        })
        return removeLike;
    },

    async getLikes(like) {
        const getLikes = await prisma.likes.findMany({
            where: {
                uid: like
            },
            select: {
                tour: {
                    select: {
                        id: true,
                        name: true,
                        providerName: true,
                    }
                }
            }
        })
        return getLikes;
    }
}