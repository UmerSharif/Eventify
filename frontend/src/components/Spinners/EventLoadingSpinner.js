import React from "react";
import "./EventLoadingSpinner.css";
export default function EventLoadingSpinner() {
  return (
    <div>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </div>
  );
}
