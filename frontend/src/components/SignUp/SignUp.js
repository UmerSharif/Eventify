import React, { Component } from "react";
import "./SignUp.css";
export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false
    };
  }

  handleLogInAnimation = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  render() {
    const Loginclasses = {
      "active-dx": true,
      "inactive-dx": false
    };
    const AddClasses = Loginclasses => {
      return Object.entries(Loginclasses)
        .filter(([key, value]) => value)
        .map(([key, value]) => key)
        .join(" ");
    };
    let returnClasses = AddClasses(Loginclasses);
    return (
      <div className="container">
        <form className="signUp">
          <h3>Create Your Account</h3>
          <p>
            Just enter your email address
            <br />
            and your password for join.
          </p>
          <input
            className="w100"
            type="email"
            placeholder="Insert eMail"
            required
            autoComplete="off"
          />
          <input type="password" placeholder="Insert Password" required />
          <input type="password" placeholder="Verify Password" required />
          <button
            onClick={this.handleLogInAnimation}
            className="form-btn sx log-in"
            type="button"
          >
            Log In
          </button>
          <button className="form-btn dx" type="submit">
            Sign Up
          </button>
        </form>
        <form
          className={`signIn ${this.state.isLogin ? `${returnClasses}` : ""}`}
        >
          <h3>
            Welcome
            <br />
            Back !
          </h3>
          <button className="fb" type="button">
            Log In With Facebook
          </button>
          <p>- or -</p>
          <input
            type="email"
            placeholder="Insert eMail"
            autoComplete="off"
            required
          />
          <input type="password" placeholder="Insert Password" required />
          <button className="form-btn sx back" type="button">
            Back
          </button>
          <button className="form-btn dx" type="submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}
