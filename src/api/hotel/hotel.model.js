import mongoose from "mongoose";
import validate from "mongoose-validator";
import paginate from "mongoose-paginate";
import uniqueValidator from "mongoose-unique-validator";
import crypto from "crypto";

// import { average } from '../helpers/utils';
import config from "../../config/env";

const Schema = mongoose.Schema;

/**
 * @swagger
 * definition:
 *   Hotel:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       address:
 *         type: string
 *       website:
 *         type: string
 *       images:
 *         type: array
 *         items:
 *           type: string
 *       location:
 *         type: object
 *         properties:
 *           latitude:
 *             type: integer
 *           longitude:
 *             type: integer
 *       reviews:
 *        type: array
 *        items:
 *          type: object
 *          properties:
 *           by:
 *             type: string
 *           rating:
 *             type: integer
 *           review:
 *             type: string
 *     required:
 *       - name
 *       - description
 */

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: "name is required"
    },
    description: {
      type: String,
      required: "description is required"
    },
    price: Number,
    priceCurrency: String,
    address: String,
    website: String,
    images: [{
      type: String
    }],
    location: {
      latitude: Number,
      longitude: Number
    },
    // Using embedded documents instead of references because it's a "one to few" relation
    reviews: [{
      by: String,
      review: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      }
    }]
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

HotelSchema.index({ name: "text" });

HotelSchema.plugin(uniqueValidator);
HotelSchema.plugin(paginate);

export default mongoose.model("Hotel", HotelSchema);
