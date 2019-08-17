import React from "react";
import "./EventItem.css";

import AuthContext from "../../context/auth-context";

const EventItem = props => (
  <AuthContext.Consumer>
    {context => {
      return (
        <div>
          <li className="event_list_item" key={props.eventId}>
            <div>
              <h3>{props.title}</h3>
              <h4>$99.99</h4>
            </div>
            <div>
              {context.userId === props.creatorId ? (
                <p>You are the owner</p>
              ) : (
                <button>Details</button>
              )}
            </div>
          </li>
        </div>
      );
    }}
  </AuthContext.Consumer>
);

export default EventItem;

// before context consume
// export default function EventItem(props) {
//   return (
//     <div>
//       <li className="event_list_item" key={props.eventId}>
//         <div>
//           <h3>{props.title}</h3>
//           <h4>$99.99</h4>
//         </div>
//         <div>
//           <button>Details</button>
//           <p>You are the owner</p>
//         </div>
//       </li>
//     </div>
//   );
// }
