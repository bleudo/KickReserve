import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock } from "react-icons/fa";
import API_FOR_ADMIN from "../../services/adminApi";
import { toast } from "react-toastify";

const NewUserModal = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await API_FOR_ADMIN.registerAdminUser({ username, password });
      toast.success("Admin created successfully");
      onClose();
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Error creating admin:", error);
      toast.error(
        "Error creating admin: " +
          (error.response?.data?.error || error.message || "Please try again")
      );
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl"
      >
        <h3 className="text-lg font-medium text-green-800 mb-4">
          Create New Admin
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-green-700 flex items-center">
              <FaUser className="mr-2 text-green-600" /> Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 flex items-center">
              <FaLock className="mr-2 text-green-600" /> Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-700 flex items-center">
              <FaLock className="mr-2 text-green-600" /> Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border-green-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-green-300 rounded-md text-sm font-medium text-green-700 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Admin
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default NewUserModal;
