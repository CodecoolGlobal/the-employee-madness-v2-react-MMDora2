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
const fetchLoc = () => {
  return fetch(`/api/locations/`).then((res) => res.json()).catch((error)=>{console.error("hiba",error.message)});
};


const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [employeeLoading, setEmployeeLoading] = useState(true);
  const [favBrands, setFavbrands] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    setEmployeeLoading(true);

    const data = [fetchEmployee(id), fetchFavBrands(), fetchLoc()];
    Promise.all(data).then((result) => {
      const [employee, favBrands,locations] = result;
      setEmployee(employee);
      setFavbrands(
        favBrands.map((brand) => ({ label: brand.name, value: brand._id }))
      );
      setLocations(locations.map((loc)=>({label:loc.city, value:loc._id})))
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
      favBrands={favBrands}
      employee={employee}
      locations={locations}
      onSave={handleUpdateEmployee}
      disabled={updateLoading}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;

// useEffect(() => {
//   setEmployeeLoading(true);

//   const data = [fetchEmployee(id), fetchEquipments(), fetchFavBrands()];
//   Promise.all(data).then((result) => {
//     const [employee, equipments, favBrands] = result;
//     setEmployee(employee);
//     setFavbrands(
//       favBrands.map((brand) => ({ label: brand.name, value: brand._id }))
//     );
//     setEquipments(
//       equipments.map((equip) => ({ label: equip.name, value: equip._id }))
//     );
//     setEmployeeLoading(false);
//   });
// }, [id]);
