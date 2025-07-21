import React, { useState, useEffect } from "react";
import { MoreVertical, X } from "lucide-react";
import Loader from "./Loader";
import { 
  useGetDevicesQuery, 
  useDeleteDeviceMutation, 
  useUpdateDeviceMutation 
} from "../redux/features/Device/device.api";
import { toast } from "sonner";

const DeviceTableComponent = () => {
  const [openActionIndex, setOpenActionIndex] = useState(null);

  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [deviceToEdit, setDeviceToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    url: "",
  });

  const { data: devices, error, isLoading, isError, refetch } = useGetDevicesQuery();
  const [deleteDevice, { isLoading: isDeleting }] = useDeleteDeviceMutation();
  const [updateDevice, { isLoading: isUpdating }] = useUpdateDeviceMutation();

  const toggleActionMenu = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleShowDetails = (device) => {
    setSelectedDevice(device);
    setShowDetailsModal(true);
    setOpenActionIndex(null);
  };

  const handleEditClick = (device) => {
    setDeviceToEdit(device);
    setEditFormData({
      url: device.url || "",
    });
    setShowEditModal(true);
    setOpenActionIndex(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only send url field for update
   const res= await updateDevice({ id: deviceToEdit.id, url: editFormData.url }).unwrap();
   console.log(res);
      toast.success("Device URL updated successfully!");
      refetch();
      setShowEditModal(false);
      setDeviceToEdit(null);
    } catch (err) {
      toast.error("Failed to update device URL");
      console.error(err);
    }
  };

  const handleDeleteClick = (device) => {
    setDeviceToDelete(device);
    setShowDeleteModal(true);
    setOpenActionIndex(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteDevice(deviceToDelete.id).unwrap();
      toast.success("Device deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete device");
      console.error(err);
    } finally {
      setShowDeleteModal(false);
      setDeviceToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeviceToDelete(null);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedDevice(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setDeviceToEdit(null);
  };

  useEffect(() => {
    if (showDetailsModal || showDeleteModal || showEditModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showDetailsModal, showDeleteModal, showEditModal]);

  if (isLoading || isDeleting || isUpdating) return <Loader />;

  if (isError) {
    return (
      <p className="text-red-500">
        Error: {error?.data?.message || "Failed to fetch devices"}
      </p>
    );
  }

  return (
    <div className="relative overflow-x-auto p-4 font-fustat ">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-purple-100 text-gray-800">
          <tr>
            <th className="p-4">Sl</th>
            <th className="p-4">Name</th>
            <th className="p-4">Username</th>
            <th className="p-4">URL</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {devices?.results?.map((device, index) => (
            <tr key={device.id} className="border-b last:border-b-0 hover:bg-gray-50 relative">
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{device.deviceName || "Upcoming"}</td>
              <td className="p-4">{device.username || "Demo"}</td>
              <td className="p-4">{device.url || "Demo"}</td>
              <td className="p-4 relative">
                <button onClick={() => toggleActionMenu(index)}>
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>

                {openActionIndex === index && (
                  <div className="absolute right-2 top-10 bg-white border rounded-md shadow-xl z-50 w-32 animate-fadeIn">
                    <button
                      onClick={() => handleShowDetails(device)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleEditClick(device)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(device)}
                      className="w-full text-left px-4 py-2 hover:bg-red-100 text-sm text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      {showDetailsModal && selectedDevice && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeInSlow font-fustat">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative transform animate-slideUpSlow max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeDetailsModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">
              Device Details
            </h2>

            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Name:</strong> {selectedDevice.deviceName || "Upcoming"}
              </p>
              <p>
                <strong>Username:</strong> {selectedDevice.username || "Demo"}
              </p>
              <p>
                <strong>URL:</strong> {selectedDevice.url || "N/A"}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(selectedDevice.createdAt).toLocaleString()}
              </p>
              <p>
                <strong>Updated:</strong>{" "}
                {new Date(selectedDevice.updatedAt).toLocaleString()}
              </p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={closeDetailsModal}
                className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deviceToDelete && (
        <div className="fixed font-fustat inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeInSlow">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6 relative transform animate-slideUpSlow">
            <button
              onClick={cancelDelete}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">
              Confirm Delete
            </h2>

            <p className="mb-6 text-gray-700">
              Are you sure you want to delete <strong>{deviceToDelete.deviceName}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && deviceToEdit && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm animate-fadeInSlow font-fustat">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative transform animate-slideUpSlow max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeEditModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">
              Edit Device URL
            </h2>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-sm text-gray-700">
              <div>
                <label className="block mb-1 font-semibold">URL</label>
                <input
                  name="url"
                  type="url"
                  value={editFormData.url}
                  onChange={handleEditInputChange}
                  required
                  className="w-full px-4 py-2 border rounded"
                  placeholder="Enter URL"
                />
              </div>

              <div className="text-right pt-4">
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="ml-2 px-5 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceTableComponent;
