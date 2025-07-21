import { baseApi } from "../../api/baseApi";


const apiClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST: Create client
    createApiClient: builder.mutation({
      query: (userInfo) => ({
        url: "/client/apiClient/create/",
        method: "POST",
        body: userInfo,
      }),
    }),

  
    getApiClients: builder.query({
      query: () => ({
        url: "/client/apiClient/list/", 
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const { useCreateApiClient, useGetApiClientsQuery } = apiClientApi;
