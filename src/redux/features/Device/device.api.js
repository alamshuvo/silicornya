import { baseApi } from "../../api/baseApi";

const deviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // POST: Create device
    createDevice: builder.mutation({
      query: (deviceData) => ({
        url: "/device/devices/create/",
        method: "POST",
        body: deviceData,
      }),
      invalidatesTags: ["Devices"],
    }),

    // GET: List devices
    getDevices: builder.query({
      query: () => ({
        url: "/device/devices/list/",
        method: "GET",
      }),
      providesTags: ["Devices"],
    }),

    // DELETE: Delete device
    deleteDevice: builder.mutation({
      query: (id) => ({
        url: `/device/devices/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Devices"],
    }),

    // PUT or PATCH: Update device
    updateDevice: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/device/devices/${id}/`,
        method: "PATCH", // or "PUT" based on your backend
        body: updatedData,
      }),
      invalidatesTags: ["Devices"],
    }),
  }),
  overrideExisting: false,
});
export const {
    useCreateDeviceMutation,
    useGetDevicesQuery,
    useDeleteDeviceMutation,
    useUpdateDeviceMutation,
  } = deviceApi;
  