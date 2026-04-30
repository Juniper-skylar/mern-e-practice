import { useState, useEffect } from "react";
import { 
        saveServiceRecord,
        getAllCars,
        getAllServices
    } from '../api/api';

function ServiceRecordRegistration() {
    
    const [ formData, setFormData ] = useState({
            recordNumber:'',
            car:'',
            service:'',
            serviceDate:''
    });

    const [cars, setCars] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
    try {
        const [carsResponse, servicesResponse] = await Promise.all([
            getAllCars(),
            getAllServices()
        ]);

        setCars(carsResponse.cars || []);
        setServices(servicesResponse.get_services || []);

    } catch (error) {
        console.error(error);
        setCars([]);
        setServices([]);
    } finally {
        setLoading(false);
    }
};

    const handleChange = (e) => {
        setFormData({ ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        try {
            await saveServiceRecord(formData);

            alert("service record saved successfully");

            setFormData({
                recordNumber:'',
                car:'',
                service:'',
                serviceDate:''
            });
            
        } catch (error) {
            alert("error while inserting service record");
            console.error("error while inserting service record", error);
        }
    }

    if(loading) {
        return <h2>loading cars and services...</h2>
    }

    return(
        <>
        
        <form onSubmit={handleSubmit}>

            <h2>enter service record info</h2>

            <input type="text"
             name="recordNumber"
             value={formData.recordNumber}
             onChange={handleChange}
             placeholder="enter service record number"
             />

            <select
             name="car"
             value={formData.car}
             onChange={handleChange}
             required
             >
             <option value="">Select Car</option>
            {cars.map((car) => (
                         <option key={car._id} value={car._id}>
                            {car.model} {car.type} ({car.plateNumber})
                         </option>
        ))}
             </select>

                             {/* Service Dropdown */}
                 <select
                     name="service"
                     value={formData.service}
                     onChange={handleChange}
                     required
                 >
                     <option value="">Select Service</option>
                     {services.map((service) => (
                         <option key={service._id} value={service._id}>
                             {service.serviceName} - ${service.servicePrice}
                         </option>
                     ))}
                 </select>
             
            <input type="date"
             name="serviceDate"
             value={formData.serviceDate}
             onChange={handleChange}
             placeholder="enter service Date"
             />

             <button type="submit">save service record</button>
             

        </form>
        
        </>
    )
}

export default ServiceRecordRegistration;

// INSERT SERVICE RECORD BUT BASED ON DATA RETRIEVED FROM THE BACKEND (CARS AND SERVICES)
//  INSTEAD OF MANUALLY ENTERING CAR ID AND SERVICE ID

// import { useState, useEffect } from "react";
// import {
//     saveServiceRecord,
//     getAllCars,
//     getAllServices
// } from "../api/api";

// function ServiceRecordRegistration() {
//     const [formData, setFormData] = useState({
//         recordNumber: "",
//         car: "",
//         service: "",
//         serviceDate: ""
//     });

//     const [cars, setCars] = useState([]);
//     const [services, setServices] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const [carsResponse, servicesResponse] = await Promise.all([
//                 getAllCars(),
//                 getAllServices()
//             ]);

//             setCars(carsResponse.data);
//             setServices(servicesResponse.data);
//         } catch (error) {
//             console.error("Error fetching data:", error);
//             alert("Failed to load cars and services");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await saveServiceRecord(formData);

//             alert("Service record saved successfully!");

//             setFormData({
//                 recordNumber: "",
//                 car: "",
//                 service: "",
//                 serviceDate: ""
//             });
//         } catch (error) {
//             console.error("Error saving service record:", error);
//             alert("Error while saving service record");
//         }
//     };

//     if (loading) {
//         return <h2>Loading cars and services...</h2>;
//     }

//     return (
//         <div className="container">
//             <form onSubmit={handleSubmit}>
//                 <h2>Register Service Record</h2>

//                 <input
//                     type="text"
//                     name="recordNumber"
//                     value={formData.recordNumber}
//                     onChange={handleChange}
//                     placeholder="Enter Record Number"
//                     required
//                 />

//                 {/* Car Dropdown */}
//                 <select
//                     name="car"
//                     value={formData.car}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select Car</option>
//                     {cars.map((car) => (
//                         <option key={car._id} value={car._id}>
//                             {car.brand} {car.model} ({car.plateNumber})
//                         </option>
//                     ))}
//                 </select>

//                 {/* Service Dropdown */}
//                 <select
//                     name="service"
//                     value={formData.service}
//                     onChange={handleChange}
//                     required
//                 >
//                     <option value="">Select Service</option>
//                     {services.map((service) => (
//                         <option key={service._id} value={service._id}>
//                             {service.serviceName} - ${service.price}
//                         </option>
//                     ))}
//                 </select>

//                 <input
//                     type="date"
//                     name="serviceDate"
//                     value={formData.serviceDate}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button type="submit">
//                     Save Service Record
//                 </button>
//             </form>
//         </div>
//     );
// }

// export default ServiceRecordRegistration;