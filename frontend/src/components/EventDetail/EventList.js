import React from "react";
import "./EventList.css";
import EventItem from "./EventItem";

export default function EventList(props) {
  const events = props.events.map(event => {
    return <EventItem eventId={event._id} title={event.title} />;
  });
  return (
    <div>
      <ul className="event__list">{events}</ul>
    </div>
  );
}
