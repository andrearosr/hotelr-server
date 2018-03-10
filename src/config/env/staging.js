import path from "path";

export const dbConfig = {
  db: "mongodb://hotelr:hotelr@ds111059.mlab.com:11059/hotelr"
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
