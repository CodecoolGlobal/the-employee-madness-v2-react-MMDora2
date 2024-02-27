import { useState } from "react";
import React from "react";
import Select from "react-select";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  favBrands,
  locations,
}) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [favBrand, setFavBrand] = useState(employee?.favoriteBrand?._id ?? "");
  const [location, setLocation] = useState(employee?.location?._id ?? "");

  const defaultBand =
    employee && favBrands.find((brand) => brand.value === favBrand);

console.log(employee.location._id)
console.log(employee.location)
console.log(locations)
console.log(location)

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        favoriteBrand: favBrand,
        location,
      });
    }

    return onSave({
      name,
      level,
      position,
      location
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
          defaultValue={defaultBand}
          onChange={(option) => setFavBrand(option.value)}
        />
      </div>

      <div className="control">
        <label htmlFor="flocation">Location:</label>

        <Select
          options={locations}
          defaultValue={
            employee && locations.find((loc) => loc.value === location)
          }
          onChange={(option) => setLocation(option.value)}
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
