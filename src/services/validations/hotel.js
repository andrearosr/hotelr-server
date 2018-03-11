import objectId from "joi-objectid";
import Joi from "joi";

Joi.objectId = objectId(Joi);

export default {
  readAll: {
    query: {
      offset: Joi.number().integer(),
      limit: Joi.number().integer(),
      sort: Joi.string()
    }
  },

  findById: {
    path: {
      id: Joi.objectId().required(),
    },
  },

  addReview: {
    path: {
      id: Joi.objectId().required(),
    },
    body: {
      by: Joi.string().required(),
      rating: Joi.number().min(1).max(5),
      review: Joi.string(),
    }
  }
};
