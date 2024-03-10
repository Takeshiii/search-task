import { api } from "./api";

//добавляем в наш api эндпоинт с пользователями
const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ user, page, limit }) => ({
        url: `users/search?q=${user}&offset=${page * 10}&limit=${limit * 10}`,
      }),
      providesTags: (user) => [{ type: "User", id: user }],
      extraOptions: {
        maxRetries: 5,
      },
    }),
  }),
});

export const { useLazyGetUsersQuery } = usersApi;
