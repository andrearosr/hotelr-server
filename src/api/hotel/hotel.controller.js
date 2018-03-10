import status from "http-status";
import axios from "axios";
import mongoose from 'mongoose';

import Hotel from "./hotel.model";
import config from "../../config/env";
import { APIError } from "../../helpers/errors";
import { paginate } from "../../helpers/utils";

const HotelController = {
  /**
   * @swagger
   * /hotels:
   *   get:
   *     tags:
   *      - Hotel
   *     description: Show all hotels
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: limit
   *         description: pagination limit.
   *         in: query
   *         required: false
   *         type: string
   *       - name: offset
   *         description: pagination offset.
   *         in: query
   *         required: false
   *         type: string
   *       - name: sort
   *         description: pagination sort.
   *         in: query
   *         required: false
   *         type: string
   *     responses:
   *       200:
   *         description: Returns an array of hotels
   *         schema:
   *          type: array
   *          items:
   *           $ref: '#/definitions/Hotel'
   */

  async readAll(req, res) {
    const offset = paginate.offset(req.query.offset);
    const limit = paginate.limit(req.query.limit);

    const find = req.query.find ? JSON.parse(req.query.find) : {};
    const sort = req.query.sort
      ? JSON.parse(req.query.sort)
      : {
          createdAt: 1
        };

    const hotels = await Hotel.paginate(find, {
      sort,
      offset,
      limit
    });
    res.json(hotels);
  },

  /**
    * @swagger
    * /hotels/{id}:
    *   get:
    *     tags:
    *      - Hotel
    *     description: Finds a hotel by its id.
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         description: hotel id
    *         type: string
    *     responses:
    *       200:
    *         description: Hotel detail
    *         schema:
    *          type: array
    *          items:
    *           $ref: '#/definitions/Hotel'
    */
  async findById(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new APIError(`Invalid objectId`, status.BAD_REQUEST);
    }

    const hotel = await Hotel.findById(id);
    if (!hotel) throw new APIError(`Hotel not found ${id}`, status.NOT_FOUND);
    return res.json(hotel);
  },
}

export default HotelController;
