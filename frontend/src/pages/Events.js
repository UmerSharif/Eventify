import React, { Component } from "react";

import "./EventStyle.css";
import Model from "../components/Model/Model";
import Backdrop from "../components/Backdrop/Backdrop";

export default class Events extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModel: false
    };
  }

  toggleModel = () => {
    this.setState({ isModel: !this.state.isModel });
  };

  cancelModelHandler = () => {
    this.setState({ isModel: !this.state.isModel });
  };
  confirmModelHandler = () => {
    this.setState({ isModel: !this.state.isModel });
  };
  render() {
    return (
      <React.Fragment>
        {this.state.isModel && <Backdrop />}
        {this.state.isModel && (
          <Model
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.cancelModelHandler}
            onConfirm={this.confirmModelHandler}
          >
            <p>Model Stuff</p>
          </Model>
        )}
        <div className="event-control">
          <button className="btn" onClick={this.toggleModel}>
            Create Event
          </button>
        </div>
      </React.Fragment>
    );
  }
}
