import {} from "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import connection from "./Db/index.js";
import { data_create, data_update } from "./Data/index.js";
import { Users } from "./Db/Models/user.model.js";
import { ManageUserProducer } from "./Kafka/Producer/index.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  console.log("Api is ready...");
});

console.log(eval(process.env.DATA));

if (eval(process.env.DATA)?.actionType === "create") {
  const user = new Users(eval(process.env.DATA));
  user.save((err, user) => {
    console.log("Created user", { user });
    // ManageUserProducer(user);
  });
}
if (eval(process.env.DATA)?.actionType === "update") {
  Users.findByIdAndUpdate(
    eval(process.env.DATA)?.id,
    { $set: { ...eval(process.env.DATA) } },
    { upsert: true, new: true },
    (err, user) => {
      console.log("Updated user", { user });
      // ManageUserProducer(user);
    }
  );
}

connection;

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Now listening on port ${PORT}`);
});
