import React, { useState } from "react";
import { Table, Input, Radio, Button, message } from "antd";

/**
 * Table Component for displaying form data in a table format.
 *
 * @param {object} formData - Form data to be displayed in the table
 * @returns {JSX.Element} TableComponent component JSX
 */
function TableComponent({ formData }) {
  // Convert form data to dataSource for the table
  const dataSource = Object.entries(formData).map(([field, value]) => ({
    key: field,
    field,
    value,
  }));

  // State for conditional rendering and handling user inputs
  const [haveChildrenValue, setHaveChildrenValue] = useState("");
  const [dependencyValue, setDependencyValue] = useState("");
  const [numberOfChildrenValue, setNumberOfChildrenValue] = useState("");

  // Convert marital status to lowercase for easier comparison
  const lowerCaseMaritial = formData.maritial.toLowerCase();
  const additionalRows = [];

  // Additional rows based on marital status
  if (lowerCaseMaritial === "single") {
    additionalRows.push(
      // Row for dependency question
      {
        key: "haveChildren",
        field: "Are you Dependent on someone?",
        value: (
          <Radio.Group
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(e) => setHaveChildrenValue(e.target.value)}
            value={haveChildrenValue}
          />
        ),
      },
      // Row for dependent's name input
      {
        key: "dependencies",
        field: "Dependent's Name",
        value: (
          <Input
            type="text"
            value={dependencyValue}
            onChange={(e) => setDependencyValue(e.target.value)}
          />
        ),
      }
    );
  } else if (lowerCaseMaritial === "married") {
    additionalRows.push(
      // Row for children question
      {
        key: "haveChildren",
        field: "Do you have any children?",
        value: (
          <Radio.Group
            options={[
              { label: "Yes", value: "yes" },
              { label: "No", value: "no" },
            ]}
            onChange={(e) => setHaveChildrenValue(e.target.value)}
            value={haveChildrenValue}
          />
        ),
      },
      // Row for number of children input
      {
        key: "numberOfChildren",
        field: "Number of children",
        value: (
          <Input
            type="number"
            value={numberOfChildrenValue}
            onChange={(e) => setNumberOfChildrenValue(e.target.value)}
          />
        ),
      }
    );
  }

  // Combine main and additional dataSource
  const updatedDataSource = [...dataSource, ...additionalRows];

  // Table columns configuration
  const columns = [
    {
      title: "Field",
      dataIndex: "field",
      key: "field",
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
    },
  ];

  const handleSave = () => {
    console.log("Mimicking data save:");
    console.log("Dependency Value:", dependencyValue);
    console.log("Number of Children Value:", numberOfChildrenValue);

    // Display success message using Ant Design's message component
    message.success("Form submitted", 2); // 2 seconds duration
  };

  return (
    <div>
      <h2>Form Data Table</h2>
      {/* Display the table */}
      <Table
        dataSource={updatedDataSource}
        columns={columns}
        pagination={true}
      />
      <Button type="primary" onClick={handleSave}>
        Save{" "}
      </Button>
    </div>
  );
}

export default TableComponent;
