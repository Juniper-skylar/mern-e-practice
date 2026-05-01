
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
            <>

            {editingRecord && (
                <div>
                    <h3>Edit service record</h3>

                    <input type="text"
                     name="recordNumber"
                     value={editFormData.recordNumber}
                     onChange={(e)=> setEditFormData({...editFormData, recordNumber:e.target.value})}
                     />

                      <input type="date"
                     name="serviceDate"
                     value={editFormData.serviceDate}
                     onChange={(e)=> setEditFormData({...editFormData, serviceDate:e.target.value})}
                     />
                    <button onClick={handleUpdate}>Update</button>

                </div>
            )}
            
            <h2>Manage Service Records</h2>

            <table border={1}>
                <thead>
                <tr>
                    <th>#</th>
                    <th>recordNumber</th>
                    <th>car</th>
                    <th>service</th>
                    <th>service date</th>
                    <th>Actions</th>
                </tr>
                </thead>

                <tbody>

                    {serviceRecord.map((srecords, index)=> (
                        <tr key={srecords._id}>
                            <td>{index + 1}</td>
                            <td>{srecords.recordNumber}</td>
                            <td>{srecords.car?.plateNumber}</td>
                            <td>{srecords.service?.serviceName}</td>
                            <td>{new Date(srecords.serviceDate).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => handleEditFormChange(srecords)}>Edit</button>
                                <button onClick={() => handleDelete(srecords._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </>
        )

    }