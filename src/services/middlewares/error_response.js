import status from "http-status";

import config from "../../config/env";

export default (err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	res.status(err.status).json({
		message: err.isPublic ? err.message : status[err.status],
		stack: config.appConfig.env === "development" ? err.stack : {}
	});
};
