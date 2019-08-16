import React from "react";
import "./EventItem.css";
export default function EventItem(props) {
  return (
    <div>
      <li className="event_list_item" key={props.eventId}>
        <div>
          <h3>{props.title}</h3>
          <h4>$99.99</h4>
        </div>
        <div>
          <button>Details</button>
          <p>You are the owner</p>
        </div>
      </li>
    </div>
  );
}
