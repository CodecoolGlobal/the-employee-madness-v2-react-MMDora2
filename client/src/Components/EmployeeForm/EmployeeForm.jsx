import { useState,useEffect } from "react";
import React from "react";
import Select from "react-select";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [favBrand, setFavBrand] = useState(employee?.favBrand ?? "");

  const [favBrands, setFavbrands] = useState([]);
  
  const defaultBrand = favBrands.find((like) => like.value === favBrand._id);

  
  const fetchFavBrands = async () => {
    return fetch("/api/favBrands").then((res) => res.json());
  };

  useEffect(() => {
     fetchFavBrands().then((favBrandss) => {
      setFavbrands(
        favBrandss.map((nextBrand) => ({
          label: nextBrand.name,
          value: nextBrand._id,
        }))
      );
      console.log(favBrands);
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        favBrand,
      });
    }

    return onSave({
      name,
      level,
      position,
      favBrand,
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>
      <div className="control">
        <label htmlFor="favBrand">Favourite brand:</label>

        <Select
          options={favBrands}
          defaultValue={defaultBrand}
          onChange={(option) => setFavBrand(option.value)}
        />
</div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
