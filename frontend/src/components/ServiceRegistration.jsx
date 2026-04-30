import { useState } from "react";
import { saveService } from '../api/api';

function ServiceRegistration() {
    
    const [ formData, setFormData ] = useState({
        serviceCode:'',
        serviceName:'',
        servicePrice:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        try {
            await saveService(formData);

            alert("service saved successfully");

            setFormData({
                serviceCode:'',
                serviceName:'',
                servicePrice:''
            });
            
        } catch (error) {
            alert("error while inserting service");
            console.error("error while inserting service", error);
        }
    }

    return(
        <>
        
        <form onSubmit={handleSubmit}>

            <h2>enter service info</h2>

            <input type="text"
             name="serviceCode"
             value={formData.serviceCode}
             onChange={handleChange}
             placeholder="enter car serviceCode"
             />

            <input type="text"
             name="serviceName"
             value={formData.serviceName}
             onChange={handleChange}
             placeholder="enter car service Name"
             />

             <input type="text"
             name="servicePrice"
             value={formData.servicePrice}
             onChange={handleChange}
             placeholder="enter car service Price"
             />

             <button type="submit">save service</button>

        </form>
        
        </>
    )
}

export default ServiceRegistration;