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
};