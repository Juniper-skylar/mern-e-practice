import axios from "axios"

const Api = axios.create({
    baseURL: "http://localhost:2000/api/auth",
    headers: {
        "Content-Type": "application/json"
    }
});

export const save = async(data) => {
    try{
        await Api.post('/signup', data);
    } catch(error) {
        console.error("error while saving...", error);
    }
}

export const signin = async(data) => {
    try{
        await Api.post('/login', data);
    } catch(error) {
        console.error("error while logging in...", error);
    }
}

