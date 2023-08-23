import React, { useState } from "react";
import { Modal, Form, Button, Input } from "antd";

// Initial form data
const initialFormData = {
  firstname: "",
  lastname: "",
  snss: "",
  maritial: "",
};

// Common button style
const buttonStyle = {
  marginRight: 10,
  borderRadius: 4,
  fontWeight: "bold",
};

/**
 * Form Modal Component
 *
 * @param {boolean} visible - Whether the modal is visible
 * @param {function} onCancel - Function to handle modal cancellation
 * @param {function} onFormSubmit - Function to handle form submission
 * @returns {JSX.Element} FormModal component JSX
 */
function FormModal({ visible, onCancel, onFormSubmit }) {
  // Form instance for Ant Design form control
  const form = Form.useForm()[0];

  // State for form data, table visibility, and current field index
  const [formData, setFormData] = useState({ ...initialFormData });
  const [showTable, setShowTable] = useState(false);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);

  // Order of fields in the form
  const fieldOrder = ["firstname", "lastname", "snss", "maritial"];

  // Handle input change for form fields
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Generate a random 10-digit number and update the snss field
  const generateRandomNumber = () => {
    console.log("generated");
    const randomNumber = Math.floor(1000000000 + Math.random() * 9000000000); // Generates a random 10-digit number
    handleInputChange("snss", randomNumber.toString()); // Set the generated number in the snss field
    console.log(randomNumber);
    alert("SNSS is Generated");
  };

  // Move to the next field in the form
  const handleNextField = () => {
    if (currentFieldIndex < fieldOrder.length - 1) {
      setCurrentFieldIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Move to the previous field in the form
  const handlePreviousField = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Render the current input field based on the current field index
  const renderCurrentInputField = () => {
    const currentField = fieldOrder[currentFieldIndex];
    const label = currentField.charAt(0).toUpperCase() + currentField.slice(1);

    return (
      <>
        <Form.Item
          label={label}
          name={currentField}
          rules={[{ required: true, message: `Please fill all fields` }]}
        >
          {currentField === "snss" ? (
            <div>
              <Input
                placeholder={`Enter your ${label.toLowerCase()}`}
                value={formData[currentField]}
                onChange={(e) =>
                  handleInputChange(currentField, e.target.value)
                }
                required={true}
              />
              <Button onClick={generateRandomNumber}>
                Generate Random 10-Digit Number
              </Button>
            </div>
          ) : (
            <Input
              placeholder={`Enter your ${label.toLowerCase()}`}
              value={formData[currentField]}
              onChange={(e) => handleInputChange(currentField, e.target.value)}
              required={true}
            />
          )}
        </Form.Item>

        {currentFieldIndex !== 0 && (
          <Button style={buttonStyle} onClick={handlePreviousField}>
            Back
          </Button>
        )}

        {currentField !== "maritial" && (
          <Button type="primary" onClick={handleNextField} style={buttonStyle}>
            Next
          </Button>
        )}
      </>
    );
  };

  // Handle form submission
  const onFinish = (values) => {
    console.log("Form submitted:", formData);
    setFormData(initialFormData);
    form.resetFields();
    setCurrentFieldIndex(0);
    onFormSubmit(formData);
    setShowTable(true);
  };

  // Handle showing the form after viewing the table
  const handleShowForm = () => {
    setShowTable(false);
  };

  return (
    <Modal open={visible} onCancel={onCancel} footer={null} title="Form Modal">
      {!showTable ? (
        <Form form={form} onFinish={onFinish}>
          {renderCurrentInputField()}
          {currentFieldIndex === fieldOrder.length - 1 && (
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  ...buttonStyle,
                  background: "#1890ff",
                  borderColor: "#1890ff",
                  marginTop: 10,
                }}
              >
                Submit
              </Button>
            </Form.Item>
          )}
        </Form>
      ) : (
        <Button
          type="primary"
          onClick={handleShowForm}
          style={{
            ...buttonStyle,
            background: "#f5222d",
            borderColor: "#f5222d",
          }}
        >
          Back to Form
        </Button>
      )}
    </Modal>
  );
}

export default FormModal;
