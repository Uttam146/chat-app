import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchUserByNameorEmail(search,token) {
    return axios.get(`${BASE_URL}/api/user?search=${search}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}