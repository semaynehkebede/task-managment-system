import axios from "axios";
const apiUrl = 'https://task-management-opll.onrender.com';
const data = localStorage.getItem("user");
const user = data ? JSON.parse(data) : '';
export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
    },
});