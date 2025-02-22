import React from 'react';
import './App.css';
import { useGetAllCarsQuery } from './store/carsApi';
import { Card, Button, Spin, Alert } from "antd";
import { EditOutlined, DeleteOutlined, MoreOutlined } from "@ant-design/icons";

function App() {
  const { data = [], isLoading, error } = useGetAllCarsQuery();

  const handleEdit = (id) => {
    console.log(id);
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  const handleMore = (id) => {
    console.log(id);
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Alert
          message="Error"
          description="Please try again"
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
        {data.map((car) => (
          <Card
            key={car.id}
            title={car.carName}
            style={{ width: '100%' }}
            actions={[
              <EditOutlined key="edit" onClick={() => handleEdit(car.id)} />,
              <DeleteOutlined key="delete" onClick={() => handleDelete(car.id)} style={{ color: "red" }} />,
              <MoreOutlined key="more" onClick={() => handleMore(car.id)} />
            ]}
          >
            <p><b>Price:</b> {car.carPrice}</p>
            <p><b>Year:</b> {car.carYear}</p>
            <p><b>Region:</b> {car.region}</p>
            <p><b>Status:</b> {car.status}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default App;