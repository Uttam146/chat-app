import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const signup = async (data) => {
    return axios.post(`${BASE_URL}/api/signup`, data, {
        headers: {
            'Content-type': 'application/json',
        }
    })
}

export const login = async (data) => {
    return axios.post(`${BASE_URL}/api/login`, data, {
        headers: {
            'Content-type': 'application/json',
        }
    })
}