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
   *       - name: q
   *         description: text query.
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
    const q = req.query.q || "";
    const offset = paginate.offset(req.query.offset);
    const limit = paginate.limit(req.query.limit);

    let query

    if (q.length) {
      query = [
        { "$match": { "name": { "$regex": q, "$options": "i" } } }
        // { "$sort": { score: { $meta: "textScore" } } }
      ]
    } else {
      const sort = req.query.sort && Object.keys(req.query.sort).length > 0
        ? JSON.parse(req.query.sort)
        : { createdBy: -1 };


      query = [
        { "$sort": sort }
      ]
    }

    const hotels = await Hotel.aggregate([
      ...query,
      {
        "$facet": {
          docs: [
            { "$limit": limit },
            { "$addFields": {
                "average_rating": {
                  "$divide": [
                    { // expression returns total
                      "$reduce": {
                        "input": "$reviews",
                        "initialValue": 0,
                        "in": { "$add": ["$$value", "$$this.rating"] }
                      }
                    },
                    { // expression returns ratings count
                    "$cond": [
                        { "$ne": [ { "$size": "$reviews" }, 0 ] },
                        { "$size": "$reviews" },
                        1
                      ]
                    }
                  ]
                }
              }
            },
            {
              "$project": {
                "reviews": 0
              }
            }
          ]
        },
      }
    ])

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

    const hotel = await Hotel.aggregate([
      { "$match": { "id": id } },
      {
        "$addFields": {
            "average_rating": {
                "$divide": [
                    { // expression returns total
                        "$reduce": {
                            "input": "$reviews",
                            "initialValue": 0,
                            "in": { "$add": ["$$value", "$$this.rating"] }
                        }
                    },
                    { // expression returns ratings count
                        "$cond": [
                            { "$ne": [ { "$size": "$reviews" }, 0 ] },
                            { "$size": "$reviews" },
                            1
                        ]
                    }
                ]
            }
        }
    }
    ]);


    if (!hotel) throw new APIError(`Hotel not found ${id}`, status.NOT_FOUND);
    return res.json(hotel);
  },

  /**
    * @swagger
    * definition:
    *   Review:
    *     type: object
    *     properties:
    *       by:
    *         type: string
    *       rating:
    *         type: integer
    *       review:
    *         type: string
    *     required:
    *       - by
    *       - rating
    * /hotels/{id}/add-review:
    *   patch:
    *     tags:
    *      - Hotel
    *     description: Adds a review to a hotel.
    *     produces:
    *       - application/json
    *     parameters:
    *       - name: id
    *         in: path
    *         required: true
    *         description: hotel id
    *         type: string
    *       - name: review
    *         description: The information of the review
    *         in: body
    *         required: true
    *         schema:
    *           $ref: '#/definitions/Review'
    *     responses:
    *       200:
    *         description: Add review
    *         schema:
    *          type: array
    *          items:
    *           $ref: '#/definitions/Hotel'
    */
  async addReview(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new APIError(`Invalid objectId`, status.BAD_REQUEST);
    }

    const hotel = await Hotel.findById(id)

    if (!hotel) throw new APIError('Hotel not found', status.NOT_FOUND);

    hotel.reviews.push(req.body);
    const updatedHotel = await hotel.save();

    res.status(status.OK).json(updatedHotel);
  }
}

export default HotelController;
