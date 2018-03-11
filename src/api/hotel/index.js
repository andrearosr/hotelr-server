import express from "express";
import validate from "express-validation";

import Hotel from "./hotel.controller";
import hotelValidator from "../../services/validations/hotel";
import { catchErrors } from "../../helpers/errors";

const router = express.Router(); // eslint-disable-line new-cap

validate.options({
  allowUnknownBody: false
});

router
  .route("/hotels")
  .get(validate(hotelValidator.readAll), catchErrors(Hotel.readAll));

router
  .route("/hotels/:id")
  .get(validate(hotelValidator.findById), catchErrors(Hotel.findById));

router
  .route("/hotels/:id/add-review")
  .patch(validate(hotelValidator.addReview), catchErrors(Hotel.addReview))

export default router;
