import path from "path";

export const dbConfig = {
  db: "mongodb://localhost/hotelr"
};

export const appConfig = {
  env: "development",
  host: "http://127.0.0.1",
  path: "/v1",
  basePath: "/api",
  port: 5000,
  publicPort: 5000,
  root: path.join(__dirname, "../../../")
};

export const constants = {
  pagination: {
    limit: 40,
    offset: 0
  }
};
