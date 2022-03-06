'use strict';

import prisma from "../lib/orm/prisma.js";
import fs from "fs";
import path from "path"

const Tours = async () => {
    const __dirname = path.resolve();
    let rawdata = fs.readFileSync(path.resolve(__dirname, 'data.json'));
    let test = JSON.parse(rawdata);
    for (var i in test) {
        const inputTour = await prisma.tour.create({
            data: {
                name: test[i].Name,
                type: test[i].Type,
                address: test[i].Address,
                addressDetail: test[i].AddressDetail,
                geo_x: test[i].geo_x,
                geo_y: test[i].geo_y,
                width:test[i].Width,
                facilities: `${test[i].Facilities}`,
                accommodation:test[i].Accomodation,
                amusement:test[i].Amusement != null ? `${test[i].Amusement}` : 'null',
                culturalFacilities:test[i].CulturalFacilities != null ? `${test[i].CulturalFacilities}` : 'null',
                guestFacilities:test[i].GuestFacilities,
                supportFacilities:test[i].SupportFacilities,
                date:test[i].Date,
                acceptNumbers:test[i].AcceptNumbers != '-' ? test[i].AcceptNumbers : null,
                parkingAvailable: test[i].ParkingAvailable != '-' ? test[i].ParkingAvailable : null,
                info: test[i].info,
                phoneNumber: test[i].PhoneNumber,
                institutionName: test[i].institutionName,
                standardDate: test[i].StandardDate,
                providerCode: test[i].ProviderCode,
                providerName: test[i].ProviderName,
            }
        })
    }
};

const InsertTour = async () => {
    await Tours();
};
InsertTour();