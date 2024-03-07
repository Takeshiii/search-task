import { api } from "./api";

//добавляем в наш api эндпоинт с пользователями
const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (user) => ({
        url: `/users/search?q=${user}`,
      }),
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = usersApi;
