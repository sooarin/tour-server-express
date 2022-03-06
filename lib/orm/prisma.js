'use strict';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
    rejectOnNotFound: false,
});

export default prisma