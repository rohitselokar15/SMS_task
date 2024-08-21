import React, { useState, useEffect } from "react";

const Data = () => {
  const [data, setData] = useState([]);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    // Load data from local storage or initialize with an empty array
    const storedData = JSON.parse(localStorage.getItem("data")) || [];
    setData(storedData);
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("data", JSON.stringify(data));
  };

  const handleAddEdit = () => {
    try {
      let updatedData = [];
      if (modalData._id) {
        // Edit existing entry
        updatedData = data.map((item) =>
          item._id === modalData._id ? modalData : item
        );
      } else {
        // Add new entry
        const newItem = {
          ...modalData,
          _id: Date.now().toString() // Generate a unique ID for the new entry
        };
        updatedData = [...data, newItem];
      }

      // Save to local storage
      saveToLocalStorage(updatedData);
      setData(updatedData);
      setModalData(null);
      alert("Data saved successfully!"); // Show success alert
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    }
  };

  const handleDelete = (id) => {
    try {
      const updatedData = data.filter((item) => item._id !== id);
      saveToLocalStorage(updatedData);
      setData(updatedData);
      alert("Data deleted successfully!"); // Show success alert
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Error deleting data. Please try again.");
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalData({ ...modalData, [name]: value });
  };

  const handleModalClose = () => {
    setModalData(null); // Reset modalData when closing
  };

  return (
    <div>
      <div className="flex m-4">
        <div className="w-[20%] rounded-lg bg-blue-500 text-white text-[18px] p-4 pl-10">
          <p className="my-6">Dashboard</p>
          <p className="my-6">Clinic</p>
          <p className="my-6">Doctor</p>
          <p className="my-6">Patients</p>
          <p className="my-6">Appointment</p>
          <p className="my-6">Program</p>
          <p className="my-6">Doctor</p>
          <p className="my-6">Patients</p>
          <p className="my-6">Program</p>
          <p className="my-6">Doctor</p>
        </div>

        <div className="w-full">
          <div className="flex justify-center mb-4">
            <input placeholder="search" className="border px-6 text-[15px]" />
            <button className="border mx-2 p-2 bg-blue-500 rounded-lg text-white px-3">
              Search
            </button>
            <div className="ml-auto">
              <button
                onClick={() => setModalData({ clinicName: '', doctorName: '', location: '' })}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Add User
              </button>
            </div>
          </div>

          <table className="table-auto mt-8 border w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Clinic Name</th>
                <th className="px-4 py-2">Doctor Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(data) ? data : []).map((item) => (
                <tr key={item._id}>
                  <td className="border px-4 py-2">{item._id}</td>
                  <td className="border px-4 py-2">{item.clinicName}</td>
                  <td className="border px-4 py-2">{item.doctorName}</td>
                  <td className="border px-4 py-2">{item.location}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => setModalData(item)}
                      className="bg-yellow-500 text-white p-2 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {modalData && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-4 rounded">
                <input
                  type="text"
                  name="clinicName"
                  placeholder="Clinic Name"
                  value={modalData.clinicName || ""}
                  onChange={handleModalChange}
                  className="mb-4 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  name="doctorName"
                  placeholder="Doctor Name"
                  value={modalData.doctorName || ""}
                  onChange={handleModalChange}
                  className="mb-4 p-2 border rounded w-full"
                />
                <input
                  type="text"
                  name="location"
                  placeholder="Location"
                  value={modalData.location || ""}
                  onChange={handleModalChange}
                  className="mb-4 p-2 border rounded w-full"
                />
                <button
                  onClick={handleAddEdit}
                  className="bg-green-500 text-white p-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={handleModalClose}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;
