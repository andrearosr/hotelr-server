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
 *       images:
 *        type: array
 *        items:
 *          type: string
 *       location:
 *        type: array
 *        items:
 *          type: number
 *          format: float
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
      required: "name is required"
    },
    images: [{
      type: String
    }],
    location: [{
      type: Number
    }],
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
