import React, { Component } from "react";
import "./AuthStyle.css";
import AuthContext from "../context/auth-context";
import "../components/SignUp/SignUp.css";

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

    this.emailElSignUp = React.createRef();
    this.passwordElSignUp = React.createRef();
  }

  handleLogInAnimation = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  handleBack = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  // toggleSignUp = () => {
  //   this.setState({
  //     isLogin: !this.state.isLogin,
  //     infoText: !this.state.infoText
  //   });
  // };

  submitHandler = e => {
    e.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;
    console.log("email is:" + email);
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    //login query
    let requestBody = {
      query: `
      query Login($email:String!, $password:String!){
        login(email: $email , password: $password) {
          userId
          token
          tokenExpiration
        }
      }
      `,
      variables: {
        email: email,
        password: password
      }
    };

    // if (!this.state.isLogin) { // this job is now done in a seperate handler
    //   requestBody = {
    //     query: `
    //       mutation createUser($email: String!, $password: String!){
    //         createUser(userInput: {email: $email , password: $password}) {
    //           _id
    //           email
    //         }
    //       }
    //     `,
    //     variables: {
    //       email: email,
    //       password: password
    //     }
    //   };
    // }
    // proper way of passing query to graphql is above, same can be done for all other queries.
    /* requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
      `
    }; */

    // create user mutation

    fetch("https://blooming-spire-94554.herokuapp.com/graphql", {
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

  //testing submihandler 2
  submitHandlerSignUp = e => {
    e.preventDefault();
    const email = this.emailElSignUp.current.value;
    const password = this.passwordElSignUp.current.value;
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {};

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation createUser($email: String!, $password: String!){
            createUser(userInput: {email: $email , password: $password}) {
              _id
              email
            }
          }
        `,
        variables: {
          email: email,
          password: password
        }
      };
    }
    // proper way of passing query to graphql is above, same can be done for all other queries.
    /* requestBody = {
      query: `
        mutation {
          createUser(userInput: {email: "${email}", password: "${password}"}) {
            _id
            email
          }
        }
      `
    }; */

    // create user mutation

    fetch("https://blooming-spire-94554.herokuapp.com/graphql", {
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

  ///submithandler 2

  render() {
    return (
      // <form className="auth-form" onSubmit={this.submitHandler}>
      //   <div className="form-control">
      //     <h4>{this.state.infoText ? "Sign in" : "Sign up"}</h4>
      //     {/* <label htmlFor="email">Email</label> */}
      //     <input
      //       type="email"
      //       autoComplete="email"
      //       id="email"
      //       ref={this.emailEl}
      //       placeholder="Enter Email"
      //     />
      //   </div>
      //   <div className="form-control">
      //     {/* <label htmlFor="password">Password</label> */}
      //     <input
      //       type="password"
      //       autoComplete="current-password"
      //       id="password"
      //       ref={this.passwordEl}
      //       placeholder="Enter Password"
      //     />
      //   </div>
      //   <div className="form-action">
      //     <button type="Submit">Submit</button>
      //     <button type="button" onClick={this.toggleSignUp}>
      //       Switch To {this.state.isLogin ? "Sign up" : "Sign in"}
      //     </button>
      //   </div>
      // </form>

      <div className="container">
        <form
          className={`signUp ${
            this.state.isLogin ? "inactive-sx" : "active-sx"
          }`}
          onSubmit={this.submitHandlerSignUp}
        >
          <h3 className="form__h3">Create Your Account</h3>
          <p className="form__p">
            Just enter your email address
            <br />
            and your password to join.
          </p>
          <input
            // className="w100"
            type="email"
            autoComplete="email"
            id="email"
            ref={this.emailElSignUp}
            placeholder="Enter Email"
          />
          <input
            type="password"
            autoComplete="current-password"
            id="password"
            ref={this.passwordElSignUp}
            placeholder="Enter Password"
          />
          {/* <input type="password" placeholder="Verify Password" required /> */}
          <button
            onClick={this.handleLogInAnimation}
            className="form-btn sx log-in"
            type="button"
          >
            Log In
          </button>
          <button className="form-btn dx" type="Submit">
            Sign Up
          </button>
        </form>
        <form
          className={`signIn ${
            this.state.isLogin ? "active-dx" : "inactive-dx"
          }`}
          onSubmit={this.submitHandler} //{`signIn ${this.state.isLogin ? `${returnClasses}` : ""}`}
        >
          <h3 className="form__h3">
            Welcome
            <br />
            Back !
          </h3>

          <p className="form__p">Log In To Create or Book Events</p>

          <input
            type="email"
            autoComplete="email"
            id="emailLogin"
            ref={this.emailEl}
            placeholder="Enter Email"
          />
          <input
            type="password"
            autoComplete="current-password"
            id="passwordLogin"
            ref={this.passwordEl}
            placeholder="Enter Password"
          />
          <button
            onClick={this.handleBack}
            className="form-btn sx back"
            type="button"
          >
            Back
          </button>
          <button className="form-btn dx" type="Submit">
            Log In
          </button>
        </form>
      </div>
    );
  }
}
export default Auth;
