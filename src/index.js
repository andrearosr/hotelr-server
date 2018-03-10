import mongoose from "mongoose";
import Promise from "bluebird";

import app from "./config/express";
import config from "./config/env";

import "babel-core/register";
import "babel-polyfill";

mongoose.Promise = Promise;
mongoose.connect(config.dbConfig.db);

const { port, path, host, env, publicPort, basePath } = config.appConfig;

app.listen(port);
console.log(`>> API ${env} started on port ${port}`);
console.log(`>> Swagger on ${host}:${publicPort}${basePath}${path}/docs`);

export default app;
