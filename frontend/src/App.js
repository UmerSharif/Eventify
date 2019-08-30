import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import "./App.css";

//pages
import AuthPage from "./pages/Auth";
import EventPage from "./pages/Events";
import BookingPage from "./pages/Bookings";
import AuthContext from "./context/auth-context";
// import Footer from "./components/Footer/Footer";
import "./main.scss";
//

//navnar
import MainNavigation from "./components/Navigation/MainNavigation";
//

class App extends React.Component {
  state = {
    token: null,
    userId: null,
    signInTextSwitchReceived: null,
    isVisible: false
  };
  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };

  FromBarsToggle = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  FromTimesCircle = () => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  // the below methods are for, when sign in clicked it shoud redirect to login page
  signInTextSwitch = ReceivedText => {
    this.setState({ signInTextSwitchReceived: ReceivedText });
  };
  resetSignInTextSwitch = () => {
    this.setState({ signInTextSwitchReceived: null });
  };

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout,
              TextFromViewDetail: this.signInTextSwitch,
              deactivateViewDetail: this.resetSignInTextSwitch,
              FromBars: this.FromBarsToggle,
              isVisibleToBars: this.state.isVisible,
              TimesCircle: this.FromTimesCircle
            }}
          >
            <div className="container-background ">
              {/* testing navigation and main content */}
              <MainNavigation />
              <main className="main-content ">
                <Switch>
                  {this.state.signInTextSwitchReceived && (
                    <Redirect from="/events" to="/auth" exact />
                  )}
                  {!this.state.token && <Redirect from="/" to="/auth" exact />}
                  {this.state.token && <Redirect from="/" to="/auth" exact />}
                  {this.state.token && (
                    <Redirect from="/auth" to="/events" exact />
                  )}
                  {!this.state.token && (
                    <Route path="/auth" component={AuthPage} />
                  )}
                  <Route path="/events" component={EventPage} />
                  {this.state.token && (
                    <Route path="/bookings" component={BookingPage} />
                  )}
                  {/* my change */}

                  {!this.state.token && (
                    <Redirect from="/bookings" to="/auth" exact />
                  )}
                </Switch>
              </main>

              {/* testing navigation and main content */}
              <div className="auroral-northern" />
              <div className="auroral-stars" />
              {/* <Footer /> */}
              <h3 className="name-tag">by @Umer</h3>
            </div>
            {/* <MainNavigation />
            <main className="main-content ">
              <Switch>
                {this.state.signInTextSwitchReceived && (
                  <Redirect from="/events" to="/auth" exact />
                )}
                {!this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && <Redirect from="/" to="/auth" exact />}
                {this.state.token && (
                  <Redirect from="/auth" to="/events" exact />
                )}
                {!this.state.token && (
                  <Route path="/auth" component={AuthPage} />
                )}
                <Route path="/events" component={EventPage} />
                {this.state.token && (
                  <Route path="/bookings" component={BookingPage} />
                )} */}
            {/* my change */}

            {/* {!this.state.token && (
                  <Redirect from="/bookings" to="/auth" exact />
                )}
              </Switch>
            </main> */}
          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
