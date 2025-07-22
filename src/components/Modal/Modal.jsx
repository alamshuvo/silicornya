import React, { useState } from "react";
import { X } from "lucide-react";

import { toast } from "sonner";
import { useCreateApiClientMutation } from "../../redux/features/apiClient/apiClient.api";

const ApiClientModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    organisation: "",
    balance: "", // keep as string for input handling
  });

  const [createApiClient, { isLoading }] = useCreateApiClientMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        balance: Number(formData.balance),
      };
console.log(payload);
      const res=await createApiClient(payload).unwrap();
      console.log(res);
      toast.success("API Client created successfully");
      setFormData({
        email: "",
        username: "",
        organisation: "",
        balance: "",
      });
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create API Client");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeInSlow">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative transform animate-slideUpSlow max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">
          Create API Client
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label htmlFor="username" className="block mb-1 font-semibold">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label htmlFor="organisation" className="block mb-1 font-semibold">
              Organisation
            </label>
            <input
              id="organisation"
              name="organisation"
              value={formData.organisation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter organisation"
            />
          </div>

          <div>
            <label htmlFor="balance" className="block mb-1 font-semibold">
              Balance
            </label>
            <input
              id="balance"
              name="balance"
              type="number"
              value={formData.balance}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="0"
              min="0"
              step="any"
            />
          </div>

          <div className="text-right pt-4">
            <button
              type="submit"
              className="px-5 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApiClientModal;
