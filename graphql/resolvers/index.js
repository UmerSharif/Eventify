const authResolver = require("../resolvers/auth");
const eventsResolver = require("../resolvers/events");
const bookingResolver = require("../resolvers/bookings");

const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver
};

module.exports = rootResolver;
