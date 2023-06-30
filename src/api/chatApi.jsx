import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export async function fetchChatsByUserId(userId,token) {
    return axios.post(`${BASE_URL}/api/chat`,{userId}, {
        headers: {
            "Content-type":"application/json",
            Authorization: `Bearer ${token}`,
        }
    }
    );
}


export async function fetchChatsByToken(token) {
    return axios.get(`${BASE_URL}/api/chat`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    );
}

export async function createGroup(data,token) {
    return axios.post(`${BASE_URL}/api/chat/group`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    );
}

export async function updateGroupChatName(data,token){
    return axios.put(`${BASE_URL}/api/chat/rename`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export async function removeUserFromGroup(data,token){
    return axios.put(`${BASE_URL}/api/chat/groupremove`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export async function addUserInGroup(data,token){
    return axios.put(`${BASE_URL}/api/chat/groupadd`,data,{
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}