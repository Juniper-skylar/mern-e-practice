import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:2000/api/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export const save = async(data) => {
    try{
       const response = await Api.post('/signup', data);
       return response.data;
    } catch(error) {
        return error.response?.data?.message || "error while saving new user";
    }
}

export const signin = async(data) => {
    try{
        const response = await Api.post('/login', data);
        return response.data;
    } catch(error) {
        return error.response?.data?.message || "error while logging in user";
    }
}

