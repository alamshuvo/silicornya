import React, { useState } from "react";
import { MoreVertical, X } from "lucide-react";
import { useGetApiClientsQuery } from "../redux/features/apiClient/apiClient.api";
import { useGetBulkClientsQuery } from "../redux/features/BulkClient/bulkClient.api";
import Loader from "./Loader";

const TableComponent = () => {
  const [openActionIndex, setOpenActionIndex] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  const {
    data: clients,
    error,
    isLoading,
    isError,
  } = useGetApiClientsQuery({ page });

  const { data: bulkClients = [] } = useGetBulkClientsQuery();

  const toggleActionMenu = (index) => {
    setOpenActionIndex(openActionIndex === index ? null : index);
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowModal(true);
    setOpenActionIndex(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handlePagination = (direction) => {
    if (direction === "next" && clients?.next) {
      setPage((prev) => prev + 1);
    } else if (direction === "prev" && clients?.previous && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <p className="text-red-500">
        Error: {error?.data?.message || "Failed to fetch clients"}
      </p>
    );
  }

  return (
    <div className="relative overflow-x-auto p-4 font-fustat">
      <table className="w-full border-collapse text-sm text-left">
        <thead className="bg-purple-100">
          <tr>
            <th className="p-4">Sl</th>
            <th className="p-4">Image</th>
            <th className="p-4">Name</th>
            <th className="p-4">Category</th>
            <th className="p-4">Balance</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {clients?.results && bulkClients?.results?.map((item, index) => (
            <tr
              key={item.id}
              className="border-b last:border-b-0 hover:bg-gray-50 relative"
            >
              <td className="p-4">{(page - 1) * 10 + index + 1}</td>
              <td className="p-4">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td className="p-4">{item.username}</td>
              <td className="p-4 capitalize">{item.organization}</td>
              <td className="p-4 capitalize">{item.balance}</td>
              <td className="p-4 relative">
                <button onClick={() => toggleActionMenu(index)}>
                  <MoreVertical className="h-5 w-5 text-gray-600" />
                </button>

                {openActionIndex === index && (
                  <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow z-10">
                    <button
                      onClick={() => handleShowDetails(item)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                    >
                      Details
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <button
          onClick={() => handlePagination("prev")}
          disabled={!clients?.previous}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => handlePagination("next")}
          disabled={!clients?.next}
          className="px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeInSlow">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative transform animate-slideUpSlow">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">
              Client Details
            </h2>

            <div className="space-y-3 text-sm text-gray-700">
              <p><strong>Name:</strong> {selectedUser.username}</p>
              <p><strong>Organization:</strong> {selectedUser.organization}</p>
              <p><strong>Balance:</strong> {selectedUser.balance}</p>
              <p><strong>API Key:</strong> {selectedUser.apiKey || "N/A"}</p>
              <p><strong>Secret:</strong> {selectedUser.secret || "N/A"}</p>
              <p><strong>SMS Sent:</strong> {selectedUser.smsSent ?? "0"}</p>
              <p><strong>Created At:</strong> {new Date(selectedUser.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> {new Date(selectedUser.updatedAt).toLocaleString()}</p>
            </div>

            <div className="mt-6 text-right">
              <button
                onClick={closeModal}
                className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableComponent;