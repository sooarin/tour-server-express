/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

'use strict';

import winston from 'winston';
import path from 'path';
import mt from 'moment-timezone';

const __dirname = path.resolve();

const date = mt().tz('Asia/Seoul');
const koreaTime = winston.format((info) => {
  info.timestamp = date.format();
  return info;
});
const logFormatter = winston.format.printf(info => `${info.timestamp} [${info.level}]: ${info.label} - ${info.message}`); // NOTE: 로그 형식 설정

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'dev'
    const isDevelopment = env === 'dev'
    return isDevelopment ? 'debug' : 'warn'
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white',
}

winston.addColors(colors)

// Service Enumerator
const logType = {
    1: 'auth',
    2: 'middleware',
    3: 'spend_item',
    4: 'system',
};

export const appLogger = (type) => {
    const init = winston.createLogger({
        level: level(),
        levels,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.label({ label: logType[type] }), // NOTE: 어떤 서비스인지 알기 위함
            koreaTime(),
            logFormatter,
        ),
        transports: [
            new winston.transports.File({ filename: path.join(__dirname, 'logs', 'app-error.log'), level: 'error' }), 
            new winston.transports.File({ filename: path.join(__dirname, `logs`, date.format('YYYY-MM-DD'), 'app.log') }),
        ],
    });
    if (process.env.NODE_ENV !== 'production') {
        init.add(new winston.transports.Console());
    }
    return init;
};

const httpLogger = () => {
    const init = winston.createLogger({ 
        level: level(),
        levels,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.label({ label: 'http' }),
            koreaTime(),
            logFormatter,
        ),
        transports: [
            new winston.transports.File({ filename: path.join(__dirname, 'logs', date.format('YYYY-MM-DD'), 'http.log') }),
        ],
    });
    if (process.env.NODE_ENV !== 'production') {
        init.add(new winston.transports.Console());
    }
    return init;
};

export const httpLogStream = {
    write: (message) => {
        httpLogger().log({
            level: 'info',
            message: message,
        });
    },
};