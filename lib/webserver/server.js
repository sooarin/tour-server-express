'use strict';

import express from 'express';
import morgan from 'morgan';
import passport from 'passport';

import "../security/middleware.js";
import { authRoute } from '../api/auth/authRoute.js';

import { appLogger, httpLogStream } from '../logger/logger.js';

const morganFormat = process.env.NODE_ENV !== "production" ? "dev" : "combined";

export async function createServer () {
    const app = express();

    app.use(passport.initialize());
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }));
    app.use(morgan(morganFormat, { stream: httpLogStream }));
    app.use('/auth', authRoute);

    app.get('/', (req, res) => {
        res.send('hihi');
    });
    return app
}

