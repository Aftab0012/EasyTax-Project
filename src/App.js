import React, { useState } from "react";
import "./App.css";
import "./styles.css";
import FormModal from "./Components/FormModal";
import HeaderComponent from "./Components/HeaderComponent";
import TableComponent from "./Components/TableComponent";

/**
 * Main App Component for the application.
 */
function App() {
  // State to manage modal visibility and form data for the table
  const [modalVisible, setModalVisible] = useState(false);
  const [formDataForTable, setFormDataForTable] = useState(null);

  // Show the form modal
  const showModal = () => {
    setModalVisible(true);
  };

  // Hide the form modal
  const hideModal = () => {
    setModalVisible(false);
  };

  // Handle form submission and prepare data for the table
  const handleFormSubmit = (formData) => {
    setFormDataForTable(formData); // Store form data for the table
    hideModal(); // Close the modal
  };

  return (
    <div className="App">
      {/* Header Component with openModal prop */}
      <HeaderComponent openModal={showModal} />

      <div className="form-title">Form data will appear below</div>

      {/* Form Modal Component */}
      <FormModal
        visible={modalVisible}
        onCancel={hideModal}
        onFormSubmit={handleFormSubmit}
      />

      {/* Render the TableComponent with form data if available */}
      {formDataForTable && <TableComponent formData={formDataForTable} />}
    </div>
  );
}

export default App;
