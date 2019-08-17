import React from "react";
import "./EventList.css";
import EventItem from "./EventItem";

export default function EventList(props) {
  const events = props.events.map(event => {
    return (
      <EventItem
        eventId={event._id}
        title={event.title}
        key={event._id}
        creatorId={event.creator._id}
        eventDate={new Date(event.date).toLocaleDateString()}
        eventPrice={event.price}
        onDetailToEventList={props.onDetailToEvents}
      />
    );
  });
  return (
    <div>
      <ul className="event__list">{events}</ul>
    </div>
  );
}
