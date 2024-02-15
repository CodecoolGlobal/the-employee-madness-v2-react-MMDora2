import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import MissingEmployeeTable from "../Components/EmployeeTable/MissingEmployeeTable";

const fetchMissingEmployees = () => {
  return fetch(`/api/missingEmployes`).then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const MissingEmployees = () => {
  const [loading, setLoading] = useState(true);
  const [employeesMissing, setEmployeesMissing] = useState(null);

  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployeesMissing((employees) => {
      return employees.filter((employee) => employee.id !== id);
    });
  };

  useEffect(() => {
    fetchMissingEmployees().then((missingEmployees) => {
      setLoading(false);
      setEmployeesMissing(missingEmployees);
    });
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <MissingEmployeeTable
      employees={employeesMissing}
      onDelete={handleDelete}
    />
  );
};
export default MissingEmployees;
