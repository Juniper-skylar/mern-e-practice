import { useState } from "react";
import { saveCar } from '../api/api';

function CarRegistration() {
    
    const [ formData, setFormData ] = useState({
        plateNumber:'',
        type:'',
        model:'',
        manufacturingYear:'',
        driverPhone:'',
        mechanicName:''
    });

    const handleChange = (e) => {
        setFormData({ ...formData,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = async(e) => {

        e.preventDefault();

        try {
            await saveCar(formData);

            alert("car saved successfully");

            setFormData({
                plateNumber:'',
                type:'',
                model:'',
                manufacturingYear:'',
                driverPhone:'',
                mechanicName:''
            });

        } catch (error) {
            alert("error while inserting car");
            console.error("error while inserting car", error);
        }
    }

    return(
        <>
        
        <form onSubmit={handleSubmit}>

            <h2>enter car info</h2>

            <input type="text"
             name="plateNumber"
             value={formData.plateNumber}
             onChange={handleChange}
             placeholder="enter car platenumber"
             />

            <input type="text"
             name="type"
             value={formData.type}
             onChange={handleChange}
             placeholder="enter car type"
             />

             <input type="text"
             name="model"
             value={formData.model}
             onChange={handleChange}
             placeholder="enter car model"
             />

             <input type="text"
             name="manufacturingYear"
             value={formData.manufacturingYear}
             onChange={handleChange}
             placeholder="enter car manufacturing Year"
             />

             <input type="text"
             name="driverPhone"
             value={formData.driverPhone}
             onChange={handleChange}
             placeholder="enter car driverPhone"
             />

             <input type="text"
             name="mechanicName"
             value={formData.mechanicName}
             onChange={handleChange}
             placeholder="enter car mechanic Name"
             />

             <button type="submit">save car</button>
             

        </form>
        
        </>
    )
}

export default CarRegistration;