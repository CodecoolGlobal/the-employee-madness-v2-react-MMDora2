import { Link } from "react-router-dom";
import "./EquipmentTable.css";
import { useState } from "react";

const EquipmentTable = ({ equipments, onDelete, setOrder, order }) => {
  const [searched, setSearched] = useState("");

  function handleSearch(e) {
    setSearched(e.target.value);
    // console.log(e.target.value)
  }
  // console.log("Equipment Array:", equipment);

  return (
    <div className="EquipmentTable">
      <table>
        <thead>
          <tr>
            <th>
              <button
                onClick={() =>
                  setOrder({
                    ...order,
                    sortedBy: "Name",
                    order: order.order === "desc" ? "asc" : "desc",
                  })
                }
              >
                Name
                {order.sortedBy === "Name" && (
                  <span>{order.order === "asc" ? " ▲" : " ▼"}</span>
                )}
              </button>
            </th>
            <th>
              <button>Type</button>
            </th>
            <th>
              <button>Amount</button>
            </th>
            <th>
              <input
                onChange={handleSearch}
                placeholder="Search by type or amount"
              ></input>
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {equipments
            .filter(
              (equipment) =>
                equipment.type.toLowerCase().includes(searched.toLowerCase()) ||
                equipment.amount.toString().includes(searched)
            )
            .map((equipment) => (
              <tr key={equipment._id}>
                <td>{equipment.name}</td>
                <td>{equipment.type}</td>
                <td>{equipment.amount}</td>
                <td>
                  <Link to={`/updateEquipment/${equipment._id}`}>
                    <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => onDelete(equipment._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default EquipmentTable;
