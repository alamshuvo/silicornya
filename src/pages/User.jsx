import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useCreateApiClientMutation } from '../redux/features/apiClient/apiClient.api';
import ApiClientTableComponent from '../components/ApiClientTalbe';
import ApiClientModal from '../components/Modal/Modal';

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const [createApiClient] = useCreateApiClientMutation();

  const handleSubmit = async (data) => {
    try {
      await createApiClient(data).unwrap();
      toast.success("API Client created successfully!");
      setShowModal(false);
      // Optionally refresh your table list here or rely on RTK Query cache updates
    } catch (err) {
      toast.error("Error creating client: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="font-fustat min-h-screen p-5">
      <p className="text-2xl font-semibold mb-5">User Page</p>

      <div className="flex justify-between items-center mb-6">
        <p className="text-xl font-medium">All User List</p>
        <button
          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          onClick={() => setShowModal(true)}
          aria-label="Add new API client"
        >
          <Plus className="mr-2" size={18} /> Add
        </button>
      </div>

      {/* Modal Form for Creating API Client */}
      <ApiClientModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />

      {/* API Clients Table */}
      <ApiClientTableComponent />
    </div>
  );
};

export default User;
