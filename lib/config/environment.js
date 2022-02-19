/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

"use strict";

import { SUPPORTED_DATABASE } from './constants.js';

export default (() => {
    const environment = {
        database: {
            dialect: process.env.DATABASE_DIALECT || SUPPORTED_DATABASE.MYSQL,
            url: process.env.DATABASE_URI || '',
        }
    };
    if (process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev' ) {
        environment.database = {
            dialect: SUPPORTED_DATABASE.SQLITE
        }
    }
    
    return environment;
})();