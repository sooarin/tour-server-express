'use-strict';

import express from 'express';
import { appLogger } from '../../logger/logger.js';
import TourService from '../../service/tourService.js';
import { ERRCODE_KR } from '../../config/constants.js';

const router = express.Router();

export default {
    async getTour(req, res, next) {
        const reqTour = {
            city: req.body.city,
            town: req.body.town,
        }
        try {
            const cityTown = reqTour.city + " " + reqTour.town;
            const tour = await TourService.getTour(cityTown);
            console.log(cityTown);
            res.json({
                tour
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003
            })
        }
    },

    async getTourDetail(req, res, next) {
        const tourId = req.params.tourId;
        try {
            const tourDetail = await TourService.getTourDetail(tourId);
            res.json({
                tourDetail,
            })
        } catch(err) {
            appLogger(4).error({message: err.message})
            res.status(500).json({
                success: false,
                message: ERRCODE_KR.ERR003
            })
        }

    }
}