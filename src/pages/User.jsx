import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

import ApiClientFormModal from '../components/Modal/ApiClientFromModal';
import DeviceTableComponent from '../components/DeviceTable';

const User = () => {
  const [showModal, setShowModal] = useState(false);
  const handleSubmit = async () => {
    try {
      // await createApiClient(data).unwrap();
      toast.success("API Client created successfully!");
      setShowModal(false);
      // Optionally refresh your client list here
    } catch (err) {
      toast.error("Error creating client: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="font-fustat">
     
      
      <p>User Page</p>

      <div className="flex justify-between items-center p-5 mt-5">
        <p className="text-xl">All User List</p>
        <button
          className="flex items-center px-3 py-2 bg-purple-500 text-white rounded-lg cursor-pointer hover:bg-purple-300"
          onClick={() => setShowModal(true)}
        >
          <Plus className="mr-1" /> Add
        </button>
      </div>

      {/* Form Modal */}
      <ApiClientFormModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
      />

      {/* Device List Table */}
      <DeviceTableComponent />
    </div>
  );
};

export default User;
