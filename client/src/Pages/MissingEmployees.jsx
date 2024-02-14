import { useEffect, useState } from "react";
import Loading from "../Components/Loading";

const MissingEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [missingEmployees, setMissingEmployees] = useState(null);

  useEffect(() => {
    fetch("/api/missingEmployes")
      .then((res) => res.json())
      .then((employees) => {
        setLoading(false);
        setMissingEmployees(employees);
      })
      .catch((error) => {
        console.error("Error fetching missing employees:", error);
      });
  }, []);

  const handleCheckboxChange = async (employeeId, present) => {
    try {
      const response = await fetch(`/api/employees/${employeeId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ present }),
      });

      if (response.ok) {
        setMissingEmployees((prevEmployees) =>
          prevEmployees.map((employee) =>
            employee._id === employeeId ? { ...employee, present } : employee
          )
        );
      } else {
        console.error("Error updating employee present status");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2>Missing Employees</h2>
      {missingEmployees.length === 0 ? (
        <p>No missing employees found.</p>
      ) : (
        <ul>
          {missingEmployees.map((employee) => (
            <li key={employee._id}>
              {employee.name}
              <input
                type="checkbox"
                checked={employee.present}
                onChange={() =>
                  handleCheckboxChange(employee._id, !employee.present)
                }
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MissingEmployees;