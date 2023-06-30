import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function sendMessages(data,token) {
    return axios.post(`${BASE_URL}/api/message`,data, {
        headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    );
}

export async function getMessages(chatId,token) {
    return axios.get(`${BASE_URL}/api/message/${chatId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    );
}