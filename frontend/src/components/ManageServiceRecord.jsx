
import { getAllServiceRecords, deleteServiceRecordById }  from '../api/api';

import { useState, useEffect } from 'react';

export default function ManageServiceRecord() {

    const [serviceRecord, setServiceRecord] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [errors, setError] = useState(null);

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
                console.log("error while fetching service record", errors);
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
        

        if(loading) {
            return <p>Loading...</p>;
        }

        return (
            <>
            
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
                            <td>{srecords.serviceDate}</td>
                            <td>
                                <button>Edit</button>
                                <button onClick={() => handleDelete(srecords._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            </>
        )

    }