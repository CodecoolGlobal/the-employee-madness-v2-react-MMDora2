import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EmployeeTable.css";

const EmployeeTable = ({
  employees,
  searched,
  handleSearch,
  onDelete,
  setOrder,
  order = { sortedBy: "", order: "" },
  handleClickPresent,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);
  function handleDeleteConfirmation(id) {
    setDeleteConfirmation(id);
  }

  function handleCancelDelete() {
    setDeleteConfirmation(null);
  }

  function handleSort(column) {
    setOrder({
      ...order,
      sortedBy: column,
      order: order.order === "desc" ? "asc" : "desc",
    });
  }

  function renderSortIcon(column) {
    return order.sortedBy === column ? (
      <span>{order.order === "asc" ? " ▲" : " ▼"}</span>
    ) : null;
  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              Present
              <button onClick={() => handleSort("Name")}>
                Name
                {renderSortIcon("Name")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("Level")}>
                Level
                {renderSortIcon("Level")}
              </button>
            </th>
            <th>
              <button onClick={() => handleSort("Position")}>
                Position
                {renderSortIcon("Position")}
              </button>
            </th>
            <th>
              <input
                onChange={handleSearch}
                placeholder="Search by level or position"
              ></input>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {!searched
            ? employees.map((employee) => (
                <tr key={employee._id}>
                  <td>
                    <input
                      type="checkbox"
                      id={employee._id}
                      checked={employee.present}
                      onChange={handleClickPresent}
                      value={employee.present}
                    ></input>
                    {employee.name}
                  </td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <Link to={`/bonus/${employee._id}`}>
                      <button type="button">$</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDeleteConfirmation(employee._id)}
                    >
                      Delete
                    </button>
                    {deleteConfirmation === employee._id && (
                      <div className="confirmation-dialog">
                        <p>Are you sure you want to delete {employee.name}?</p>
                        <button onClick={() => onDelete(employee._id)}>
                          Yes
                        </button>
                        <button onClick={handleCancelDelete}>No</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            : employees.map((employee) =>
                employee.position
                  .toLowerCase()
                  .includes(searched.toLowerCase()) ||
                employee.level
                  .toLowerCase()
                  .includes(searched.toLowerCase()) ? (
                  <tr key={employee._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={employee.present}
                        readonly
                      />
                      {employee.name}
                    </td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteConfirmation(employee._id)}
                      >
                        Delete
                      </button>
                      {deleteConfirmation === employee._id && (
                        <div className="confirmation-dialog">
                          <p>
                            Are you sure you want to delete {employee.name}?
                          </p>
                          <button onClick={() => onDelete(employee._id)}>
                            Yes
                          </button>
                          <button onClick={handleCancelDelete}>No</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : null
              )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
