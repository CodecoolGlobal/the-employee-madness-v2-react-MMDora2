import "./EmployeeTable.css";

const MissingEmployeeTable = ({ employees, onDelete }) => {
    return (
      <div className="EmployeeTable">
         <p><h2>{`Total ${employees.length} employees are missing.`}</h2></p>
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