import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useState } from "react";

const EmployeeTable = ({ employees, onDelete, setOrder, order }) => {
  const [searched, setSearched] = useState("");

  function handleSearch(e) {
    setSearched(e.target.value);
    // console.log(e.target.value)
  }

  return (
    <div className="EmployeeTable">
      <table>
        <thead>
          <tr>
            <th>
              Present
              <button
                onClick={() =>
                  setOrder({
                    ...order,
                    sortedBy: "Name",
                    order: order.order === "desc" ? "asc" : "desc",
                  })
                }
              >
                Name
                {order.sortedBy === "Name" && (
                  <span>{order.order === "asc" ? " ▲" : " ▼"}</span>
                )}
              </button>
            </th>
            <th>
              <button
                onClick={() =>
                  setOrder({
                    ...order,
                    sortedBy: "Level",
                    order: order.order === "desc" ? "asc" : "desc",
                  })
                }
              >
                Level
                {order.sortedBy === "Level" && (
                  <span>{order.order === "asc" ? " ▲" : " ▼"}</span>
                )}
              </button>
            </th>
            <th>
              <button
                onClick={() =>
                  setOrder({
                    ...order,
                    sortedBy: "Position",
                    order: order.order === "desc" ? "asc" : "desc",
                  })
                }
              >
                Position
                {order.sortedBy === "Position" && (
                  <span>{order.order === "asc" ? " ▲" : " ▼"}</span>
                )}
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
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>
                    <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(employee._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/bonus/${employee._id}`}>
                      <button type="button">Bonus</button>
                    </Link>
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
                        onClick={() => onDelete(employee._id)}
                      >
                        Delete
                      </button>
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
