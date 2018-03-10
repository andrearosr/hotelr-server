import path from "path";

export const dbConfig = {
  db: "mongodb://hotelr:hotelr@ds263948.mlab.com:63948/heroku_3rbqp1qn"
};

export const appConfig = {
  env: "staging",
  host: "https://hotelrapi.herokuapp.com/",
  path: "/v1",
  basePath: "/api",
  port: process.env.PORT,
  publicPort: process.env.PORT,
  root: path.join(__dirname, "../../../")
};

export const constants = {
  pagination: {
    limit: 40,
    offset: 0
  }
};
