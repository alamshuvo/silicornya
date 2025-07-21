import { baseApi } from "../../api/baseApi";


const bulkClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST: Create client
    createBulkClient: builder.mutation({
      query: (userInfo) => ({
        url: "/client/bulkClient/create/",
        method: "POST",
        body: userInfo,
      }),
    }),

  
    getBulkClients: builder.query({
      query: () => ({
        url: "/client/bulkClient/list/", 
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const { useCreateBulkClientMutation,useGetBulkClientsQuery } = bulkClientApi;
