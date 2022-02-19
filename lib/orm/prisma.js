/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

'use strict';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient({
    rejectOnNotFound: false,
});

export default prisma