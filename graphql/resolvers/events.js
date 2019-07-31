const Event = require("../../models/event");

const { transformEvent } = require("./merge");

module.exports = {
  events: async () => {
    //testing without mongodb
    // return events;
    try {
      const events = await Event.find();
      console.log("new events stuff" + events);
      return events.map(event => {
        console.log("sup" + event);
        return transformEvent(event);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  // create event resolvers
  createEvent: async args => {
    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: +args.eventInput.price,
      date: dateToString(args.eventInput.date),
      creator: "5d18a46fcf7e5c2d08f4860a"
    });
    let createdEvent;
    try {
      const result = await event.save();

      createdEvent = transformEvent(result);
      const creatorUser = await User.findById("5d18a46fcf7e5c2d08f4860a");
      console.log(result);
      //return { ...result._doc, _id: result._doc._id.toString() }; // replace the original id with the new string id

      if (!creatorUser) {
        throw new Error("yo dude, the dude man is on another planet");
      }
      creatorUser.createdEvents.push(event);
      await creatorUser.save();

      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }

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
  }
};
