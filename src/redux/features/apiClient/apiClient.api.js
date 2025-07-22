import { baseApi } from "../../api/baseApi";

const apiClientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createApiClient: builder.mutation({
      query: (clientData) => ({
        url: "/client/apiClient/create/",
        method: "POST",
        body: clientData,
      }),
      invalidatesTags: ["Clients"],
    }),

    // GET: List API Clients
    getApiClients: builder.query({
      query: () => ({
        url: "/client/apiClient/list/",
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),

    // DELETE: Delete API Client
    deleteApiClient: builder.mutation({
      query: (id) => ({
        url: `/client/apiClient/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),

    // PATCH: Update API Client
    updateApiClient: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/client/apiClient/${id}/`,
        method: "PATCH", // Use PUT if your backend expects it
        body: updatedData,
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateApiClientMutation,
  useGetApiClientsQuery,
  useDeleteApiClientMutation,
  useUpdateApiClientMutation,
} = apiClientApi;
