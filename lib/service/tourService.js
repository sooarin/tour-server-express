'use strict';

import prisma from "../orm/prisma.js";

export default {
    async getTour(tour) {
        const getTour = prisma.tour.findMany({
            where: {
                providerName: tour,
            },
            select: {
                id: true,
                name: true,
                providerName: true,
            }
        })
        return getTour;
    },

    async getTourDetail(tourId, base) {
        const id = parseInt(tourId, base);
        const getTourDetail = prisma.tour.findUnique({
            where: {
                id: id,
            }
        })
        return getTourDetail;
    },
}