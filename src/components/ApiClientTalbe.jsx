import React, { useState, useEffect } from "react";
import { MoreVertical, X } from "lucide-react";
import Loader from "./Loader";
import { toast } from "sonner";
import {
  useDeleteApiClientMutation,
  useGetApiClientsQuery,
  useUpdateApiClientMutation,
} from "../redux/features/apiClient/apiClient.api";
import { useGetBulkClientsQuery } from "../redux/features/BulkClient/bulkClient.api";

const ApiClientTableComponent = () => {
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [clientToDelete, setClientToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    email: "",
    username: "",
    organisation: "",
    balance: "",
  });

  // New states for details modal
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);

  const {
    data: clients,
    error,
    isLoading,
    isError,
    refetch,
  } = useGetApiClientsQuery();
  const { data: bulkClients } = useGetBulkClientsQuery();

  const [deleteApiClient, { isLoading: isDeleting }] = useDeleteApiClientMutation();
  const [updateApiClient, { isLoading: isUpdating }] = useUpdateApiClientMutation();

  const toggleActionMenu = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleEditClick = (client) => {
    setClientToEdit(client);
    setEditFormData({
      email: client.email || "",
      username: client.username || "",
      organisation: client.organisation || "",
      balance: client.balance || "",
    });
    setShowEditModal(true);
    setOpenActionIndex(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...editFormData,
        balance: Number(editFormData.balance),
      };
      await updateApiClient({ id: clientToEdit.id, ...payload }).unwrap();
      toast.success("Client updated successfully!");
      refetch();
      setShowEditModal(false);
      setClientToEdit(null);
    } catch (err) {
      toast.error("Failed to update client", err);
    }
  };

  const handleDeleteClick = (client) => {
    setClientToDelete(client);
    setShowDeleteModal(true);
    setOpenActionIndex(null);
  };

  const confirmDelete = async () => {
    try {
      await deleteApiClient(clientToDelete.id).unwrap();
      toast.success("Client deleted successfully!");
      refetch();
    } catch (err) {
      toast.error("Failed to delete client", err);
    } finally {
      setShowDeleteModal(false);
      setClientToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setClientToDelete(null);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setClientToEdit(null);
  };

  const cancelEdit = () => {
    closeEditModal();
  };

  // Details handlers
  const handleDetailsClick = (client) => {
    setClientDetails(client);
    setShowDetailsModal(true);
    setOpenActionIndex(null);
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setClientDetails(null);
  };

  const cancelDetails = () => {
    closeDetailsModal();
  };

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", showEditModal || showDeleteModal || showDetailsModal);
    return () => document.body.classList.remove("overflow-hidden");
  }, [showEditModal, showDeleteModal, showDetailsModal]);

  if (isLoading || isDeleting || isUpdating) return <Loader />;
  if (isError) return <p className="text-red-500">Error: {error?.data?.message || "Fetch failed"}</p>;

  // Combine both clients and bulkClients into one list
  const combinedClients = [
    ...(clients?.results || []),
    ...(bulkClients?.results || []),
  ];

  return (
    <div className="relative overflow-x-auto p-4 font-fustat">
      {combinedClients.length === 0 ? (
        <div className="text-center py-10 text-gray-500">No API Clients Found.</div>
      ) : (
        <table className="w-full text-sm border-collapse">
          <thead className="bg-purple-100 text-gray-800">
            <tr>
              <th className="p-4">Sl</th>
              <th className="p-4">Email</th>
              <th className="p-4">Username</th>
              <th className="p-4">Organisation</th>
              <th className="p-4">Balance</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {combinedClients.map((client, index) => (
              <tr key={client.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{index + 1}</td>
                <td className="p-4">{client.email}</td>
                <td className="p-4">{client.username}</td>
                <td className="p-4">{client.organisation || "-"}</td>
                <td className="p-4">{client.balance ?? 0}</td>
                <td className="p-4 relative">
                  <button onClick={() => toggleActionMenu(index)}>
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                  {openActionIndex === index && (
                    <div className="absolute right-2 top-10 bg-white border rounded-md shadow-xl z-50 w-32">
                      <button
                        onClick={() => handleDetailsClick(client)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEditClick(client)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteClick(client)}
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
      )}

      {/* Delete Modal */}
      {showDeleteModal && clientToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
            <button
              onClick={cancelDelete}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close delete modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-purple-600 mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete <strong>{clientToDelete.username}</strong>?</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && clientToEdit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={closeEditModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close edit modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-purple-600 mb-6">Edit Client</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Username</label>
                <input
                  type="text"
                  name="username"
                  value={editFormData.username}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Organisation</label>
                <input
                  type="text"
                  name="organisation"
                  value={editFormData.organisation}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded"
                />
              </div>
              <div>
                <label className="block mb-1 font-semibold">Balance</label>
                <input
                  type="number"
                  name="balance"
                  value={editFormData.balance}
                  onChange={handleEditInputChange}
                  className="w-full px-4 py-2 border rounded"
                  min="0"
                  step="any"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && clientDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full overflow-y-auto max-h-[90vh] relative">
            <button
              onClick={closeDetailsModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              aria-label="Close details modal"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-purple-600 mb-4">Client Details</h2>
            <div className="space-y-2 text-gray-700 mb-6">
              <p><strong>Email:</strong> {clientDetails.email}</p>
              <p><strong>Username:</strong> {clientDetails.username}</p>
              <p><strong>Organisation:</strong> {clientDetails.organisation || "-"}</p>
              <p><strong>Balance:</strong> {clientDetails.balance ?? 0}</p>
            </div>
            <div className="text-right">
              <button
                onClick={cancelDetails}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiClientTableComponent;
