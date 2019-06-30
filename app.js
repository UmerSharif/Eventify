const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const User = require("./models/user");
const Event = require("./models/event");
const bcrypt = require("bcryptjs");
const app = express();
const events = [];
app.use(bodyParser.json());

app.use(
  "/graphql",
  graphqlHttp({
    schema: buildSchema(`

    type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
        creator: User! 
    }

    type User {
      _id: ID!
      email: String!
      password: String
      createdEvents: [Event!]
    }

    input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
        events: [Event!]!
    }

    type RootMutation {
         createEvent(eventInput: EventInput): Event
         createUser(userInput: UserInput): User
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
    `),
    rootValue: {
      events: () => {
        //testing without mongodb
        // return events;

        return Event.find()
          .populate("creator")
          .then(events => {
            return events.map(event => {
              console.log(event);
              return {
                ...event._doc,
                _id: event._doc._id.toString(), // replace the original id with the new string id
                creator: {
                  ...event._doc.creator._doc,
                  _id: event._doc.creator.id // replace the original id with the new string id, without using to string provided by mongoose
                }
              };
            });
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },

      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
          creator: "5d18a46fcf7e5c2d08f4860a"
        });
        let createdEvent;
        return event
          .save()
          .then(result => {
            createdEvent = { ...result._doc, _id: result._doc._id.toString() };
            return User.findById("5d18a46fcf7e5c2d08f4860a");
            console.log(result);
            //return { ...result._doc, _id: result._doc._id.toString() }; // replace the original id with the new string id
          })
          .then(user => {
            if (!user) {
              throw new Error("yo dude, the dude man is on another planet");
            }
            user.createdEvents.push(event);
            return user.save();
          })
          .then(result => {
            return createdEvent;
          })
          .catch(err => {
            console.log(err);
            throw err;
          });

        //testing
        /*  const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date
        };
        console.log(event);
        events.push(event);
        return event; */
      },
      createUser: args => {
        // check for existing user
        return User.findOne({ email: args.userInput.email })
          .then(user => {
            if (user) {
              throw new Error("yo dude, the dude man already exist");
            }
            return bcrypt.hash(args.userInput.password, 12);
          })
          .then(hashedPassword => {
            const user = new User({
              email: args.userInput.email,
              password: hashedPassword
            });
            return user.save();
          })
          .then(result => {
            return { ...result._doc, password: null, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      }
    },
    graphiql: true
  })
);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${
      process.env.MONGO_PASSWORD
    }@cluster0-hhine.mongodb.net/${
      process.env.MONGO_DB
    }?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
  )
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
