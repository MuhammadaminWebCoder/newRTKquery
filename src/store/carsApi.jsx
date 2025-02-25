import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carsApi = createApi({
  reducerPath: "carsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/cars",
    }),
    getItem: builder.query({
        query: (id) => `/cars/${id}`,
      }),
    addCar: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
    }),
    editCar: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: data,
      }),

    }),
    deleteCar: builder.mutation({
        query: (id) => ({
          url: `/cars/${id}`,
          method: "DELETE",
        }),
      }),
      
    logIn: builder.query({
      query: () => "/users",
    }),
  }),
});

export const { useGetAllCarsQuery,useGetItemQuery, useAddCarMutation,useDeleteCarMutation, useEditCarMutation, useLogInQuery } = carsApi;
