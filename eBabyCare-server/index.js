const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// //database connection
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vxgvs.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverApi: ServerApiVersion.v1,
// });
// async function run() {
//   try {
//     await client.connect();
//     console.log("database connected successfully");
//   } finally {
//     // await client.close();
//   }
// }
// run().catch(console.dir);

// console.log(uri);
const port = process.env.PORT || 5000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello doctors portal");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
