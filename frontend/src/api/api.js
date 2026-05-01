import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:2000/api",
    headers: {
        "Content-Type": "application/json"
    }
});

export const save = async(data) => {
    try{
       const response = await Api.post('/auth/signup', data);
       return response.data;
    } catch(error) {
        return error.response?.data?.message || "error while saving new user";
    }
}

export const signin = async(data) => {
    try{
        const response = await Api.post('/auth/login', data);
        return response.data;
    } catch(error) {
        return error.response?.data?.message || "error while logging in user";
    }
}

export const saveCar = async(data) => {
    try {
        const response = await Api.post('/car/register-car', data);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || "error while saving car";
    }
}

export const saveService = async(data) => {
    try {
        const response = await Api.post('/service/register-service', data);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || "error while saving service";
    }
}

export const saveServiceRecord = async(data) => {
    try {
        const response = await Api.post('/servicerecord/insertservicerecord', data);
        return response.data;
    } catch (error) {
        return error.response?.data?.message || "error while saving service record";
    }
}


// not used yet in admin db
export const getAllCars = async() => {
    try {
        const response = await Api.get('/car/getAllCars');
        return response.data;
    } catch (error) {
        return error.response?.data?.message || "error while fetching cars";
    }
}


// not used yet in retreving in admin dashboard
export const getAllServices = async() => {
    try {
        const response = await Api.get('/service/getAllServices');
        return response.data;
    } catch (error) {
        return error.response?.data?.message || "error while fetching services";
    }
}

export const getAllServiceRecords = async() => {
    try {
        const response = await Api.get('/servicerecord/getservicerecords');
        return response?.data?.getServiceRecords;
    } catch (error) {
        return error.response?.data?.message || "error while fetching service records";
    }
}

export const deleteServiceRecordById = async (id) => {
    try {
        await Api.delete(`/servicerecord/deleteservicerecordbyid/${id}`);
        return "Service record deleted successfully";
    } catch (error) {
        return error.response?.data?.message || "Error while deleting service record";
    }
};

export const updateServiceRecordById = async (id, data) => {
    try{
      const response = await Api.put(`/servicerecord/updateservicerecordbyid/${id}`, data);
      return response.data;
    } catch(error) {
        return error.response?.data?.message || "Error while updating service record";
    }
}
