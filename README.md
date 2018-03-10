# Hotelr API - Browse hotels with your fingertips

### Getting started

Clone this repo into your preferred location.

#### Requirements

1. Node 7.6+
2. Mongo 3.6+

#### Running Mobile Client

1. From the project root, run `npm install`
2. To run tests, run `npm run test` or `npm run watch` to watch for file changes

**Using the remote server (a)**

3. There's a live server already set up running at `https://hotelrapi.herokuapp.com/`

**If you want to run a local server (b)**

3. To run in development mode, you need to initialize your local mongo driver. [Install mongo](https://docs.mongodb.com/manual/installation/) if you haven't already, create a `~/data/db` directory and run `mongod` to initialize driver and listen for incoming connections at `mongo://localhost`
4. From the project root directory, run `npm run load-hotels && npm run load-reviews`. This will initialize sufficient documents to test all features of the Mobile Client.
5. Run `npm run dev`. This will set up a server running on `http://127.0.0.1` connected to the local mongo database.

#### Using the REST API

1. With either host name, the API root is `/api/v1/`.

If using remote server, you can browse the full API documentation [here](https://hotelrapi.herokuapp.com/api/v1/docs/#/).

If using a local server, you can browse it [here](http://127.0.0.1:5000/api/v1/docs)

**Note:** The `master` branch on the Mobile Client uses the Heroku server (a). If you want to easily switch to a local server (b), use the `local-server` branch.
