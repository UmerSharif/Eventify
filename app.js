const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const isAuth = require("./middleware/is-auth");

const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");
const cors = require("cors");

const app = express();
//const events = []; testing
app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  "/graphql",
  graphqlHttp({
    schema: graphQLSchema,
    rootValue: graphQLResolvers
  })
);

const port = process.env.PORT || 5000;

// mongoose
//   .connect(
//     `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-hhine.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
//     { useNewUrlParser: true }
//   )
//   .then(() => {
//     app.listen(port);
//   })
//   .catch(err => {
//     console.log(err);
//   });

//test
mongoose
  .connect(
    "mongodb+srv://umer:RrfmjxoHNA7OMtny@cluster0-hhine.mongodb.net/my-eventdb?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(port);
  })
  .catch(err => {
    console.log(err);
  });
