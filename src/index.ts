import { config } from "dotenv";
import { MongoClient } from "mongodb";

import app from "./app";

config();

const PORT = process.env.PORT || 8080;

const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const host = process.env.DB_HOST;

const uri = `mongodb+srv://${user}:${password}@${host}`;

// eslint-disable-next-line import/prefer-default-export
// export const mongoService = new MongoClient(uri);

// mongoService
//   .connect()
//   .then(() => {
//     console.log("mongodb is connected");
//   })
//   .catch((e) => {
//     console.error(e);
//   });

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
