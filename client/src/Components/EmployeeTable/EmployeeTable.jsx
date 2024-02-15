import { Link } from "react-router-dom";
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
                    <button
                      type="button"
                      onClick={() => onDelete(employee._id)}
                    >
                      Delete
                    </button>
                    <Link to={`/bonus/${employee._id}`}>
                      <button type="button">$</button>
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
