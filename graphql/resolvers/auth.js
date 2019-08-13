const User = require("../../models/user");
const bcrypt = require("bcryptjs");

module.exports = {
  createUser: async args => {
    // check for existing user
    try {
      const existingUser = await User.findOne({ email: args.userInput.email });

      if (existingUser) {
        throw new Error("yo dude, the dude man already exist");
      }
      const hashedPassword = bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        password: hashedPassword
      });
      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async args => {
    //args can also be retrieved by desctructuring {(email, password)} instead of writing args
  }
};
