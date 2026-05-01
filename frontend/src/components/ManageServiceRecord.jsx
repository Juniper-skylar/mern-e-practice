
import {
    getAllServiceRecords,
    deleteServiceRecordById,
    updateServiceRecordById
     }  from '../api/api';

import { useState, useEffect } from 'react';

export default function ManageServiceRecord() {

    const [serviceRecord, setServiceRecord] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [errors, setError] = useState(null);


    // state management for edit form
    const [editFormData, setEditFormData] = useState({
        recordNumber:'',
        serviceDate:''
    });
    const [editingRecord, setEditingRecord] = useState(null);

    const handleEditFormChange = (srecord) => {

        setEditingRecord(srecord._id);
        setEditFormData({
            recordNumber:srecord.recordNumber,
            serviceDate:srecord.serviceDate
        });
    }

    useEffect(() => {
        fetchServiceRecord();
    }, []);

         const fetchServiceRecord = async () => {
            try {
                    const data = await getAllServiceRecords();
                    setServiceRecord(data);
                    
                    setLoading(false);
                }
                
             catch (error) {
                alert("error while fetching service record");
                setError(error.message);
                console.log("error while fetching service record", error);
                setLoading(false);
            }

        }

        const handleDelete = async (id) => {
            try {
                await deleteServiceRecordById(id);
                setServiceRecord(serviceRecord.filter((srecord) => srecord._id !== id));
                alert("service record deleted");
            } catch (error) {
                console.log("error while deleting user ", error)
                alert("service record deleted");
            }
        }
       
        
        const handleUpdate = async () => {
        
           try {

            //editing record stores id of document to update
            await updateServiceRecordById(editingRecord, editFormData);

            // refresh data
            fetchServiceRecord();

            // reset form
            setEditingRecord(null);
            alert("data updated successful")
           } catch (error) {
                console.log(error);
                alert("error while updating");
           }
        
        }
        

        if(loading) {
            return <p>Loading...</p>;
        }

      return (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6 text-white">

    {/* Header */}
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-3xl font-bold">Service Records</h2>
      <span className="text-gray-400 text-sm">
        Manage all service records
      </span>
    </div>

    {/* Loading */}
    {loading && (
      <div className="text-center text-gray-300">Loading records...</div>
    )}

    {/* Error */}
    {errors && (
      <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg mb-4">
        {errors}
      </div>
    )}

    {/* Table Card */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-xl">

      <table className="w-full text-left">
        <thead className="bg-white/10 text-gray-300 text-sm uppercase">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4">Record</th>
            <th className="p-4">Car</th>
            <th className="p-4">Service</th>
            <th className="p-4">Date</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {serviceRecord.map((srecords, index) => (
            <tr
              key={srecords._id}
              className="border-t border-white/10 hover:bg-white/10 transition"
            >
              <td className="p-4">{index + 1}</td>
              <td className="p-4 font-medium">{srecords.recordNumber}</td>
              <td className="p-4 text-gray-300">
                {srecords.car?.plateNumber}
              </td>
              <td className="p-4 text-gray-300">
                {srecords.service?.serviceName}
              </td>
              <td className="p-4 text-gray-300">
                {new Date(srecords.serviceDate).toLocaleDateString()}
              </td>

              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEditFormChange(srecords)}
                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-sm transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(srecords._id)}
                  className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-sm transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* MODERN EDIT MODAL */}
    {editingRecord && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">

        <div className="w-full max-w-md bg-gray-900 border border-white/20 rounded-2xl p-6 shadow-2xl">

          <h3 className="text-xl font-bold mb-4">Edit Service Record</h3>

          <div className="space-y-3">

            <input
              type="text"
              value={editFormData.recordNumber}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  recordNumber: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Record Number"
            />

            <input
              type="date"
              value={editFormData.serviceDate}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  serviceDate: e.target.value,
                })
              }
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 mt-5">

            <button
              onClick={() => setEditingRecord(null)}
              className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleUpdate}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
            >
              Update
            </button>

          </div>

        </div>
      </div>
    )}

  </div>
);

    }