import React from "react";
import "./ViewDetailModel.css";

export default function ViewDetailModel(props) {
  return (
    <div className="model">
      <header className="model__header">
        <h1>Book this Event</h1> <h1>{props.title}</h1>
      </header>
      <section className="model__content">
        <h3>
          <p style={{ color: "#0b8076" }}> Event Type : </p>
          <span className="view-detail-description">{props.description}</span>
        </h3>
        <h3>
          <p style={{ color: "#0b8076" }}> Total Cost : </p>${props.price}
        </h3>
        <h3>
          <p style={{ color: "#0b8076" }}> Sceduled : </p>
          {new Date(props.date).toLocaleDateString()}
        </h3>
      </section>

      <section className="model__actions">
        <button className="btn" onClick={props.onCancel}>
          Cancel
        </button>

        <button
          className="btn"
          onClick={props.onConfirm.bind(this, props.confirmText)}
        >
          {props.confirmText}
        </button>
      </section>
    </div>
  );
}
