import { baseApi } from "../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login/",
        method: "POST",
        body: userInfo,  // userInfo can be FormData or JSON depending on usage
        // Do NOT set 'Content-Type' header here; baseQuery will handle it
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useLoginMutation } = authApi;
