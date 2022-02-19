/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

'use strict';

import dotenv from 'dotenv'
import environment from './environment.js';

dotenv.config();

export async function init() {
    // If there is some initialization needed, make it here.
    console.log('Current Database is '+environment.database.dialect);
}