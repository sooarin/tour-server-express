'use-strict';

import express from 'express';
import path from 'path';
import fs from "fs";
import prisma from "../../orm/prisma.js";
import { appLogger } from '../../logger/logger';
import TourService from '../../service/tourService.js';

const router = express.Router();

export default {
    async insertTour(req, res, next) {
        const __dirname = path.resolve();
        let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
        let test = JSON.parse(rawdata);
        for (var i in test) {
            const inputTour = await prisma.tour.create({
                data: {
                    name: test[i].Name,
                    type: test[i].Type,
                    address: test[i].Address,
                    addressDetail: test[i].addressDetail,
                    geo_x: test[i].geo_x,
                    geo_y: test[i].geo_y,
                    width:test[i].width,
                    facilities:test[i].facilities,
                    accommodation:test[i].accomodation,
                    amusement:test[i].amusement,
                    culturalFacilities:test[i].culturalFacilities,
                    guestFacilities:test[i].guestFacilities,
                    supportFacilities:test[i].supportFacilities,
                    date:test[i].date,
                    acceptNumbers:test[i].acceptNumbers,
                    parkingAvailable: test[i].parkingAvailable,
                    info: test[i].info,
                    phoneNumber: test[i].phoneNumber,
                    institutionName: test[i].institutionName,
                    standardDate: test[i].standardDate,
                    providerCode: test[i].providerCode,
                    providerName: test[i].providerName,
                }
            })
        }
        
    }
}