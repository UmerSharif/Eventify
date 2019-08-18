import React, { Component } from "react";
import AuthContext from "../context/auth-context";
import "./Booking.css";
import EventLoadingSpinner from "../components/Spinners/EventLoadingSpinner";

export default class Bookings extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      bookedEvents: []
    };
  }
  componentDidMount() {
    this.loadBookEvents();
  }

  loadBookEvents = () => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            bookings {
              _id
              createdAt
              updatedAt
              event {
                title
                description
                price
                date
              }
            
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
        this.setState({ bookedEvents: resData.data.bookings });
        this.setState({ isLoading: false });
        // this.setState(prevState => {
        //   const updatedBookEvent = [...prevState.bookedEvents];
        //   updatedBookEvent.push({
        //     _id: resData.data.bookings._id
        //   });
        //   return { bookedEvents: updatedBookEvent };
        // });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };

  deleteBooking = bookingId => {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          mutation {
            cancelBooking(bookingId: "${bookingId}") {
                _id
                title
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
          const updatedBookEvent = prevState.bookedEvents.filter(
            bookE => bookE._id !== bookingId
          );

          return { bookedEvents: updatedBookEvent };
        });
        this.setState({ isLoading: false });
        // this.setState(prevState => {
        //   const updatedBookEvent = [...prevState.bookedEvents];
        //   updatedBookEvent.push({
        //     _id: resData.data.bookings._id
        //   });
        //   return { bookedEvents: updatedBookEvent };
        // });
      })
      .catch(err => {
        console.log(err);
        this.setState({ isLoading: false });
      });
  };
  render() {
    return (
      // <ul>
      //   {this.state.bookedEvents.map(bookEvent => (
      //     <li>{bookEvent.event.title}</li>
      //   ))}
      // </ul>
      <React.Fragment>
        {this.state.isLoading ? (
          <EventLoadingSpinner />
        ) : (
          <div className="book-event-list">
            <div className="title-wrapper">
              <h1>Your's Booked Events</h1>
            </div>

            {this.state.bookedEvents.map(bookEvent => (
              <li className="event_list_item" key={bookEvent._id}>
                <div>
                  <h3>
                    {" "}
                    <p style={{ color: "#0b8076" }}> Event Type : </p>{" "}
                    <span className="booked-event-title">
                      {bookEvent.event.title}
                    </span>
                  </h3>
                  <h4>
                    <p style={{ color: "#0b8076" }}> Total Cost : </p> $
                    {bookEvent.event.price}
                  </h4>
                  <h4>
                    {" "}
                    <p style={{ color: "#0b8076" }}> Sceduled : </p>{" "}
                    {new Date(bookEvent.event.date).toLocaleDateString()}
                  </h4>
                  <h4>
                    {" "}
                    <p style={{ color: "#0b8076" }}> Created at : </p>{" "}
                    {new Date(bookEvent.createdAt).toLocaleDateString()}
                  </h4>
                  <h4>
                    {" "}
                    <p style={{ color: "#0b8076" }}> Updated at: </p>{" "}
                    {new Date(bookEvent.updatedAt).toLocaleDateString()}
                  </h4>
                </div>
                <div>
                  <button
                    onClick={this.deleteBooking.bind(this, bookEvent._id)}
                  >
                    Cancel Booking
                  </button>
                </div>
              </li>
            ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}
