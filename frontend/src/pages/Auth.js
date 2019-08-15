import React, { Component } from "react";
import "./AuthStyle.css";
import AuthContext from "../context/auth-context";

class Auth extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      isLogin: true,
      infoText: true
    };

    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  toggleSignUp = () => {
    this.setState({
      isLogin: !this.state.isLogin,
      infoText: !this.state.infoText
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    console.log(password);

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    //login query
    let requestBody = {
      query: `
      query {
        login(email: "${email}" , password: "${password}") {
          userId
          token
          tokenExpiration
        }
      }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    // create user mutation

    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Operation Failed.. Suck it bitch :D");
        }
        return res.json();
      })
      .then(resData => {
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <form className="auth-form" onSubmit={this.submitHandler}>
        <div className="form-control">
          <h4>{this.state.infoText ? "Sign in" : "Sign up"}</h4>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            autoComplete="username"
            id="email"
            ref={this.emailEl}
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            ref={this.passwordEl}
          />
        </div>
        <div className="form-action">
          <button type="Submit">Submit</button>
          <button type="button" onClick={this.toggleSignUp}>
            Switch To {this.state.isLogin ? "Sign up" : "Sign in"}
          </button>
        </div>
      </form>
    );
  }
}
export default Auth;
