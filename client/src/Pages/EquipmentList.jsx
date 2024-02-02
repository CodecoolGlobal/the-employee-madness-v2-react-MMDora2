import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";

const fetchEquipment = (sortedBy,order) => {
  if (sortedBy === "" && order=== ""){
    return fetch (`/api/equipments`).then((res) => res.json())
  }
  const query=new URLSearchParams({sortedBy:sortedBy, order:order, })
  return fetch(`/api/employees/order?${query}`).then((res) => res.json())
};

const deleteEquipment = (id) => {
  return fetch(`/api/equipments/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EquipmentList = () => {
  const [loading, setLoading] = useState(true);
  const [equipment, setEquipments] = useState(null);
  const [order, setOrder] = useState({
    sortedBy: "",
    order: ""
  })

  const handleDelete = (id) => {
    deleteEquipment(id);

    setEquipments((equipments) => {
      return equipments.filter((equipment) => equipment._id !== id);
    });
  };

  useEffect(() => {
    fetchEquipment(order.sortedBy,order.order)
      .then((equipments) => {
        console.log(equipments)
        setLoading(false);
        setEquipments(equipments);
      })
  }, [order.order,order.sortedBy]);

  if (loading) {
    return <Loading />;
  }

  return <EquipmentTable equipments={equipment} setOrder={setOrder} order={order} onDelete={handleDelete} />;
};

export default EquipmentList;
