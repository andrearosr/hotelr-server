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
 *       images:
 *        type: array
 *        items:
 *          type: string
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
    address: {
      type: String,
    },
    images: [{
      type: String
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
