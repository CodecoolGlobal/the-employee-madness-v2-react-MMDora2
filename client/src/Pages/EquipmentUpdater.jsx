import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";
import Loading from "../Components/Loading";


const updateEquipment = (equipment) => {
  return fetch(`/api/equipments/${equipment._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(equipment),
  }).then((res) => res.json());
};

const fetchEquipment = (id) => {
  return fetch(`/api/equipments/${id}`).then((res) => res.json());
};

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [equipment, setEquipment] = useState(null);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [equipmentLoading, setEquipmentLoading] = useState(true);

  useEffect(() => {
    setEquipmentLoading(true);
    fetchEquipment(id).then((fetchedEquipment) => {
      setEquipment(fetchedEquipment);
      setEquipmentLoading(false);
    });
  }, [id]);

  const handleUpdateEquipment = (updatedEquipment) => {
    setUpdateLoading(true);
    updateEquipment(updatedEquipment).then(() => {
      setUpdateLoading(false);
      navigate("/equipments");
    });
  };

  if (equipmentLoading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment} 
      onSave={handleUpdateEquipment}
      disabled={updateLoading}
      onCancel={() => navigate("/equipments")}
    />
  );
};

export default EquipmentUpdater;