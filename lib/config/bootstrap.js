'use strict';

import dotenv from 'dotenv'
import environment from './environment.js';

dotenv.config();

export async function init() {
    // If there is some initialization needed, make it here.
    console.log('Current Database is '+environment.database.dialect);
}