'use strict';

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
    async removeLike(like, base) {
        const id = parseInt(like.tid, base);
        const removeLike = await prisma.likes.delete({
            where: {
                id: id
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