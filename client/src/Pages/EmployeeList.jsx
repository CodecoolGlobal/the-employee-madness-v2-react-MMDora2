import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (sortedBy,order) => {
  if (sortedBy === "" && order=== ""){
    return fetch (`/api/employees`).then((res) => res.json())
  }
  const query=new URLSearchParams({sortedBy:sortedBy, order:order, })
  return fetch(`/api/employees/order?${query}`).then((res) => res.json())
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [order, setOrder] = useState({
    sortedBy: "",
    order: ""
  })

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees(order.sortedBy,order.order)
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
      })
  }, [order.order,order.sortedBy]);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={employees} setOrder={setOrder} order={order} onDelete={handleDelete} />;
};

export default EmployeeList;
