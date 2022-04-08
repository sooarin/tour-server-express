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
            },
            select: {
                id: true,
                name: true,
                type: true,
                address: true,
                addressDetail: true,
                geo_x: true,
                geo_y: true,
                width: true,
                facilities: true,
                accommodation: true,
                amusement: true,
                culturalFacilities: true,
                guestFacilities: true,
                supportFacilities: true,
                date: true,
                acceptNumbers: true,
                parkingAvailable: true,
                info: true,
                phoneNumber: true,
                institutionName: true,
                standardDate: true,
                providerCode: true,
                providerName: true,
                comments: true,
            }
        })
        return getTourDetail;
    },

    async findOne(tid, base) {
        const id = parseInt(tid, base);
        const tour = await prisma.tour.findUnique({
            where: {
                id: id,
            }
        })
        return tour;
    }
}