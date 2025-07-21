import {
    createApi,
    fetchBaseQuery,
  } from "@reduxjs/toolkit/query/react";
  import { toast } from "sonner";
  import { logOut } from "../auth/authSlice";
  
  // Basic fetch with token header setup
  const baseQuery = fetchBaseQuery({
    baseUrl: "/",
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState()).auth?.token;
      console.log(token);
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }
      return headers;
    },
  });
  
  // Enhanced query with basic error handling (no refresh token)
  const baseQueryWithErrorHandling = async (
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);
  
    if (result?.error?.status === 401) {
      // Unauthorized, log out
      api.dispatch(logOut());
      toast.error("Session expired. Please log in again.");
    }
  
    if (result?.error?.status === 404) {
      toast.error((result?.error?.data )?.message || "Not found");
    }
  
    return result;
  };
  
  // Create the API slice
  export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Clients"],
    endpoints: () => ({}),
  });
  