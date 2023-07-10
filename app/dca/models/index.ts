import { dbUrl } from "../core/config/db.config";
import { dcaSchema } from "./dca.model";
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {
  mongoose,
  url: dbUrl,
  dca: dcaSchema(mongoose),
};
export default db;
