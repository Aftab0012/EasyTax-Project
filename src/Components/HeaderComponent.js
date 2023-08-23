import React from "react";
import "../styles.css";

/**
 * Header Component for the application.
 *
 * @param {object} props - Component props containing openModal function
 */
function HeaderComponent(props) {
  return (
    <header className="header">
      {/* Application title */}
      <h1 className="header-title">EasyTaxes</h1>

      {/* Button to open the form modal */}
      <button className="create-form-btn" onClick={props.openModal}>
        Create Form
      </button>
    </header>
  );
}

export default HeaderComponent;
