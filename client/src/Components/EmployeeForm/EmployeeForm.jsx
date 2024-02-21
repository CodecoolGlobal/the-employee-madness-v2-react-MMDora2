import { useState } from "react";
import React from "react";
import Select from "react-select";

const EmployeeForm = ({
  onSave,
  disabled,
  employee,
  onCancel,
  favBrands,
  equipments,
}) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [favBrand, setFavBrand] = useState(employee?.favoriteBrand?._id ?? "");
  const [equipment, setEquipment] = useState(employee?.equipment?._id ?? "");

  const [startDate, setStartDate] = useState(employee?.startDate ?? "");
  
  // const defaultBand=favBrands.find((brand) => brand.value === favBrand)
  // const defaultEquipment = equipments.find((equip) => equip.value === (employee?.equipment?._id ?? ""))

  const onSubmit = (e) => {
    e.preventDefault();

    let updatedEquipments = [];
    if (equipments) {
      if (equipment !== "") {
        const addNewEquip = { name: equipment };
        updatedEquipments = employee.equipments.push(addNewEquip);
      } else {
        updatedEquipments = employee.equipments;
      }
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
          updatedEquipments,
          favoriteBrand: favBrand,
        });
      }
      return onSave({
        name,
        level,
        position,
        updatedEquipments,
        favBrand,
      });
    } else {
      if (employee) {
        return onSave({
          ...employee,
          name,
          level,
          position,
          favoriteBrand: favBrand,
        });
      }

      return onSave({
        name,
        level,
        position,
        favBrand,
      });
    }
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
        <label htmlFor="startDate">Starting Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          name="startDate"
          id="startDate"
        />
      </div>
      
      <div className="control">
        <label htmlFor="equipment">Equipments:</label>

        <Select
          options={equipments}
          defaultValue={
            employee &&
            equipments.find(
              (equip) => equip.value === (employee?.equipment?._id ?? "")
            )
          }
          onChange={(option) => setEquipment(option ? option.value : "")}
        />
      </div>
      <div className="control">
        <label htmlFor="favBrand">Favourite brand:</label>

        <Select
          options={favBrands}
          defaultValue={
            employee &&
            favBrands.find(
              (brand) => brand.value === (employee?.favoriteBrand?._id ?? "")
            )
          }
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
