import config from "../config/env";

const { pagination } = config.constants;

export const paginate = {
  limit(limit, value) {
    return limit !== undefined ? limit : value || pagination.limit;
  },
  offset(offset, value) {
    return offset !== undefined ? offset : value || pagination.offset;
  }
};
