import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";

const updateEmployee = (employee) => {
  return fetch(`/api/employees/${employee._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  }).then((res) => res.json());
};

const fetchEmployee = (id) => {
  return fetch(`/api/employees/${id}`).then((res) => res.json());
};
const fetchFavBrands = () => {
  return fetch(`/api/favBrands`).then((res) => res.json());
};

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    setEmployeeLoading(true);
    fetchEmployee(id).then((employee) => {
      setEmployee(employee);
      fetchFavBrands().then((brands) => {
        setBrands(
          brands.map((nextBrand) => ({
            label: nextBrand.name,
            value: nextBrand._id,
          }))
        );
        console.log("Fav Brands:", brands);
      });
      setEmployeeLoading(false);
    });
  }, [id]);

  const handleUpdateEmployee = (employee) => {
    setUpdateLoading(true);
    updateEmployee(employee).then(() => {
      setUpdateLoading(false);
      navigate("/");
    });
  };

  if (employeeLoading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      brands={brands}
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
