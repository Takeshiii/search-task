import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//инициализируем пустой api сервис в который мы будем внердять наши эндпоинты
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com"}),
    tagTypes: ["User"],
    endpoints: () => ({}),
})