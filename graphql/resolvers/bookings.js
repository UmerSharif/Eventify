const Event = require("../../models/event");
const Booking = require("../../models/booking");

const { transformBooking, transformEvent } = require("./merge");

module.exports = {
  //book Event resolvers

  bookings: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Authorization failed for getting bookings...");
    }
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => {
        return transformBooking(booking);
      });
    } catch (err) {
      throw err;
    }
  },

  bookEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Authorization failed for book event...");
    }
    const fetchedEvent = await Event.findOne({ _id: args.eventId });
    const booking = new Booking({
      user: req.userId,
      event: fetchedEvent
    });

    const result = await booking.save();
    return transformBooking(result);
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Authorization failed...");
    }
    try {
      const fectchBooking = await Booking.findById(args.bookingId).populate(
        "event"
      );
      const event = transformEvent(fectchBooking.event);
      await Booking.deleteOne({ _id: args.bookingId });
      return event;
    } catch (err) {
      throw err;
    }
  }
};
