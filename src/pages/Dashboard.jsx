import React, { useEffect, useState } from "react";
import { useAddCarMutation, useDeleteCarMutation, useEditCarMutation, useGetAllCarsQuery } from "../store/carsApi";
import { Card, Button, Spin, Alert, Modal, Input, Select } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { data = [], isLoading, error } = useGetAllCarsQuery();
  const [saveCarsList] = useAddCarMutation();
  const [editCar] = useEditCarMutation();

  const [openModal, setOpenModal] = useState(false);
  const [editId, setEditId] = useState(null);

  const [carName, setCarName] = useState("");
  const [carPrice, setCarPrice] = useState("");
  const [carYear, setCarYear] = useState("");
  const [carRegion, setCarRegion] = useState("");
  const [carStatusId, setCarStatusId] = useState("new");
  const navigate = useNavigate()
  const [deleteCar] = useDeleteCarMutation();

  useEffect(() => {
    if (editId !== null) {
      const car = data.find((item) => item.id === editId);
      if (car) {
        setCarName(car.carName);
        setCarPrice(car.carPrice);
        setCarYear(car.carYear);
        setCarRegion(car.carRegion);
        setCarStatusId(car.carStatusId);
      }
    } else {
      setCarName("");
      setCarPrice("");
      setCarYear("");
      setCarRegion("");
      setCarStatusId("new");
    }
  }, [editId, data]);

  const handleEdit = (id) => {
    setEditId(id);
    setOpenModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCar(id).unwrap(); 
      toast.success("Car deleted successfully");
    } catch (error) {
      toast.error("Failed to delete car"); 
    }
  };

  const handleMore = (id) => {
    navigate(`/${id}`)
  };

  const handleSaveCar = () => {
    setOpenModal(false);
    const newCar = { carName, carPrice, carYear, carRegion, carStatusId };

    if (editId) {
      editCar({ id: editId, ...newCar });
    } else {
      saveCarsList(newCar);
    }
    setEditId(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert message="Error" description="Please try again" type="error" showIcon />
      </div>
    );
  }

  return (
    <div className="p-5 container mx-auto">
      <div className="w-full items-center py-3 flex justify-between">
        <p className="text-xl font-semibold">List of Cars</p>
        <Button onClick={() => {setOpenModal(true),setEditId(null)}} size="large" type="primary">
          Add Car
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {data.map((car) => (
          <Card
            key={car.id}
            title={car.carName}
            style={{ width: "100%" }}
            actions={[
              <EditOutlined key="edit" onClick={() => handleEdit(car.id)} />,
              <DeleteOutlined key="delete" onClick={() => handleDelete(car.id)} style={{ color: "red" }} />,
              <MoreOutlined key="more" onClick={() => handleMore(car.id)} />,
            ]}
          >
            <p>
              <b>Price:</b> {car.carPrice} $
            </p>
            <p>
              <b>Year:</b> {car.carYear}
            </p>
            <p>
              <b>Region:</b> {car.carRegion}
            </p>
            <p>
              <b>Status:</b> {car.carStatusId}
            </p>
          </Card>
        ))}
      </div>

      <Modal open={openModal} onOk={handleSaveCar} onCancel={() => setOpenModal(false)} title={editId ? "Edit Car" : "Add Car"}>
        <div className="pt-10 flex flex-col gap-3">
          <Input onChange={(e) => setCarName(e.target.value)} value={carName} placeholder="Car Name" size="large" />
          <Input onChange={(e) => setCarPrice(e.target.value)} value={carPrice} placeholder="Price" type="number" size="large" />
          <Input onChange={(e) => setCarYear(e.target.value)} value={carYear} placeholder="Year" size="large" />
          <Input onChange={(e) => setCarRegion(e.target.value)} value={carRegion} placeholder="Region" size="large" />
          <Select
            onChange={(e) => setCarStatusId(e)}
            value={carStatusId}
            size="large"
            options={[
              { value: "new", label: "New" },
              { value: "modern", label: "Modern" },
              { value: "old", label: "Old" },
            ]}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
