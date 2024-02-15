import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = (sortedBy, order) => {
  if (sortedBy === "" && order === "") {
    return fetch(`/api/employees`).then((res) => res.json());
  }
  const query = new URLSearchParams({ sortedBy: sortedBy, order: order });
  return fetch(`/api/employees/order?${query}`).then((res) => res.json());
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
    order: "",
  });
  const [searched, setSearched] = useState("");
  const [counter, setCounter] = useState(0);


  function handleSearch(e) {
    setSearched(e.target.value);
    // console.log(e.target.value)
  }
  const handleDelete = (id) => {
    deleteEmployee(id);
    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const updatePresence = (id, present) => {
    console.log(present);
    if (present === "false") {
      return fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ present: true }),
      }).then((res) => res.json());
    } else {
      return fetch(`/api/employees/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ present: false }),
      }).then((res) => res.json());
    }
  };

  const handleClickPresent = async (event) => {
    if (event.target.type === 'checkbox') {
    await updatePresence(event.target.id, event.target.value);
    setCounter((counter) => {
      return counter + 1;
    });}
  };

  useEffect(() => {
    fetchEmployees(order.sortedBy, order.order).then((employees) => {
      setLoading(false);
      setEmployees(employees);
    });
  }, [order.order, order.sortedBy, counter]);

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeTable
      employees={employees}
      searched={searched}
      handleSearch={handleSearch}
      setOrder={setOrder}
      order={order}
      onDelete={handleDelete}
      handleClickPresent={handleClickPresent}
    />
  );
};

export default EmployeeList;
