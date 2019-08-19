const Event = require("../../models/event");
const User = require("../../models/user");

const { dateToString } = require("../../helpers/date");

const DataLoader = require("dataloader");

const eventLoader = new DataLoader(eventIds => {
  return events(eventIds);
});

const userLoader = new DataLoader(userIds => {
  // for debugging console.log(userIds);
  return User.find({ _id: { $in: userIds } });
});

const events = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });

    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const singleEvent = await eventLoader.load(eventId); //before dataloader await Event.findById(eventId);
    return singleEvent; //transformEvent(singleEvent); before dataloader
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    //DataLoader must be constructed with a function which accepts Array<key> "the error occurs becuase the mogodb keys are objects and need to convert to string"
    const user = await userLoader.load(userId.toString()); // before dataloader User.findById(userId);

    return {
      ...user._doc,
      _id: user.id,
      createdEvents: () => eventLoader.loadMany(this, user._doc.createdEvents) // before dataloader events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

const transformEvent = event => {
  return {
    ...event._doc,
    _id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt),
    event: singleEvent.bind(this, booking._doc.event), // using event id stored in booking
    user: user.bind(this, booking._doc.user) // using user id stored in booking
  };
};

//module.exports = user;
//module.exports = events;
//module.exports = singleEvent;
exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;
