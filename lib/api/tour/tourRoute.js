'use strict';

import express from "express";
import tourController from '../tour/tourController.js'

export const tourRoute = express.Router();

tourRoute.post('/', tourController.getTour);
tourRoute.get('/:tourId', tourController.getTourDetail);