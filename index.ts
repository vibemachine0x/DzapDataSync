import express from "express";
import dcaRoutes from "./app/dca/endpoint/routes/dca.routes";
import { initDCA } from "./app/dca/init";
import db from "./app/dca/models";

require("dotenv").config();
const cors = require("cors");

async function startServer() {
  const app = express();

  app.use(cors());
  app.options("*", cors());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // routes and api calls
  app.use("/dca", dcaRoutes);

  app.use(function onError(_err: any, _req: any, res: any, _next: any) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;

    res.end(res.sentry + "\n");
  });

  db.mongoose
    .connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to the database!");
    })
    .catch((err: any) => {
      console.log("Cannot connect to the database!", err);
      process.exit();
    });

  // start node server
  const port = process.env.PORT || 8080;
  app.listen(port, () => {
    console.log(`App available http://localhost:${port}`);
    initDCA();
  });
}

startServer();
