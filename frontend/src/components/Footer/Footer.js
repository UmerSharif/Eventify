import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer__div">
      <svg
        className="svg__footer"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
      >
        <path
          className="path__footer"
          d="M-1.41,63.64 C160.55,170.22 349.20,-49.98 501.97,55.75 L500.00,150.00 L0.00,150.00 Z"
        />
      </svg>
      <h3>By @Umer</h3>
      {/* links here */}
    </div>
  );
}
