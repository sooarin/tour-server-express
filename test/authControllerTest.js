/* 
 *  Copyright Gymmon Co. - All Rights Reserved
 *  Unauthorized copying of this file, via any medium is strictly prohibited
 *  Proprietary and confidential
 *  Written by Jasper Lee <jh.lee@gymmon.work>, July 2021
 */

'use strict';

import jest from "jest";
import request from 'supertest';

import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset, MockProxy } from 'jest-mock-extended'

import fitcok from '../index.js';
import prisma from '../lib/orm/prisma.js';

jest.mock('../lib/orm/prisma.js', mockDeep<PrismaClient>())


describe('Test /hello', () => {
    it ('should return world!', (done) => {
      request(app).get('/hello').then((response) => {
        expect(response.text).toBe('world!');
        done();
      });
    });
  });
  