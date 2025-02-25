import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetItemQuery } from '../store/carsApi';

const DashboardItem = () => {
  const { id } = useParams();
  const { data: more, isLoading, error } = useGetItemQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: Failed to fetch data</p>;

  return (
    <div>
      <h1>Car Details</h1>
      <p><b>Name:</b> {more.carName}</p>
      <p><b>Price:</b> {more.carPrice} $</p>
      <p><b>Year:</b> {more.carYear}</p>
      <p><b>Region:</b> {more.carRegion}</p>
      <p><b>Status:</b> {more.carStatusId}</p>
    </div>
  );
};

export default DashboardItem;
