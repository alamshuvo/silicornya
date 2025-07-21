import React, { useState } from "react";
import { X } from "lucide-react";

import { toast } from "sonner";
import { useCreateDeviceMutation } from "../../redux/features/Device/device.api";

const DeviceFormModal = ({ show, onClose }) => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    url: "",
  });

  const [createDevice, { isLoading }] = useCreateDeviceMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createDevice(formData).unwrap();
      console.log(res);
      toast.success("Device created successfully");
      setFormData({ userName: "", password: "", url: "" });
      onClose();
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create device");
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm animate-fadeInSlow">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative transform animate-slideUpSlow">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-purple-600 mb-6 border-b pb-2">
          Create Device
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm text-gray-700">
          <div>
            <label className="block mb-1">User Name</label>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Password</label>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              type="password"
              className="w-full px-4 py-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">URL</label>
            <input
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              type="url"
              className="w-full px-4 py-2 border rounded"
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

export default DeviceFormModal;
