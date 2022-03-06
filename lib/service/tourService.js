'use strict';

import prisma from "../orm/prisma";

export default {
    async getTour(tour) {
        const getTour = prisma.tour.findMany({
            where: {
                city: tour.city,
                town: tour.town,
            }
        })
        return getTour;
    }
}