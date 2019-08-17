import React, { Component } from "react";

import "./EventStyle.css";
import Model from "../components/Model/Model";
import Backdrop from "../components/Backdrop/Backdrop";
import AuthContext from "../context/auth-context";
import EventList from "../components/EventDetail/EventList";
import EventLoadingSpinner from "../components/Spinners/EventLoadingSpinner";
import ViewDetailModel from "../components/Model/ViewDetailModel";

export default class Events extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);

    this.state = {
      isModel: false,
      isViewDetailModel: false,
      isLoading: false,
      events: [],
      selectedEventOnclick: null
    };

    this.titleEl = React.createRef();
    this.priceEl = React.createRef();
    this.dateEl = React.createRef();
    this.descEl = React.createRef();

    this.loadEvents = this.loadEvents.bind(this);
  }

  componentDidMount() {
    this.loadEvents();
  }
  //form submission model
  toggleModel = () => {
    this.setState({
      isModel: !this.state.isModel
    });
  };
  cancelModelHandler = () => {
    this.setState({ isModel: !this.state.isModel });
  };

  cancelViewDetailModel = () => {
    this.setState({
      isViewDetailModel: !this.state.isViewDetailModel,
      selectedEventOnclick: null
    });
  };

  confirmModelHandler = e => {
    e.preventDefault();
    this.setState({ isModel: !this.state.isModel });

    const title = this.titleEl.current.value;
    const price = +this.priceEl.current.value;
    const date = this.dateEl.current.value;
    const desc = this.descEl.current.value;

    // mild check

    if (
      title.trim().length === 0 ||
      price.length <= 0 ||
      date.trim().length === 0 ||
      desc.trim().length === 0
    ) {
      return;
    }
    //const eventData = { title, price, date, desc }; //{title: title, price: price .......}

    //queries and mutation

    const requestBody = {
      query: `
          mutation {
            createEvent(eventInput: {title: "${title}",description: "${desc}", price: ${price}, date: "${date}"}) {
              _id
              title
              description
              price
              date
          }
        }
        `
    };

    // create user mutation
    const token = this.context.token;
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Operation Failed.. Suck it bitch :D");
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedEvents = [...prevState.events];
          updatedEvents.push({
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            price: resData.data.createEvent.price,
            date: resData.data.createEvent.date,
            creator: {
              _id: this.context.userId
            }
          });
          return { events: updatedEvents };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  loadEvents() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            events {
              _id
              title
              description
              price
              date
              creator {
                _id
                email
              }
          }
        }
        `
    };

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
        const eventdata = resData.data.events;
        this.setState({ events: eventdata, isLoading: false });
        console.log(eventdata);
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  }

  viewDetailHandler = eventId => {
    this.setState(prevState => {
      const selectedEventOnclick = prevState.events.find(event => {
        return event._id === eventId;
      });
      return { selectedEventOnclick: selectedEventOnclick };
    });
    this.setState({ isViewDetailModel: !this.state.isViewDetailModel });
  };
  render() {
    // const eventList = this.state.events.map(event => {
    //   return (
    //     <li className="event_list_item" key={event._id}>
    //       {event.title}
    //     </li>
    //   );
    // });
    return (
      <React.Fragment>
        {this.state.isViewDetailModel && <Backdrop />}
        {this.state.isModel && <Backdrop />}
        {this.state.isModel && (
          <Model
            title="Add Event"
            canCancel
            canConfirm
            onCancel={this.cancelModelHandler}
            onConfirm={this.confirmModelHandler}
          >
            <form className="event__form">
              <div className="form-control">
                <label htmlFor="Title">Title</label>
                <input
                  type="text"
                  autoComplete="title"
                  id="title"
                  ref={this.titleEl}
                  placeholder="Enter Title"
                />
              </div>
              <div className="form-control">
                <label htmlFor="Price">Price</label>
                <input
                  type="number"
                  autoComplete="number"
                  id="price"
                  ref={this.priceEl}
                  placeholder="Enter Price"
                />
              </div>
              <div className="form-control">
                <label htmlFor="Date">Date</label>
                <input
                  type="date"
                  autoComplete="date"
                  id="date"
                  ref={this.dateEl}
                />
              </div>
              <div className="form-control">
                <label htmlFor="Description">Description</label>
                <textarea
                  type="text"
                  autoComplete="text"
                  id="description"
                  ref={this.descEl}
                  placeholder="Enter Description"
                />
              </div>
            </form>
          </Model>
        )}
        {this.context.token && (
          <div className="event-control">
            <button className="btn" onClick={this.toggleModel}>
              Create Event
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <EventLoadingSpinner />
        ) : (
          <EventList
            events={this.state.events}
            onDetailToEvents={this.viewDetailHandler}
          />
        )}
        {/* (logged in information can also be paased from contex here, like this.context.userId) */}

        {/* //ViewDetailModel */}

        {this.state.selectedEventOnclick && (
          <ViewDetailModel
            title={this.state.selectedEventOnclick.title}
            price={this.state.selectedEventOnclick.price}
            date={this.state.selectedEventOnclick.date}
            description={this.state.selectedEventOnclick.description}
            onCancel={this.cancelViewDetailModel}
          />
        )}
      </React.Fragment>
    );
  }
}
