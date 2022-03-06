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