import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";

const MissingEmployeeTable = ({ employees, onDelete }) => {
    return (
      <div className="EmployeeTable">
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default MissingEmployeeTable;