import Axios from 'axios';

const serverURL = process.env.EXPO_PUBLIC_SERVER_URL || "http://localhost:8000";

export default Axios.create({
    baseURL: serverURL + "/api",
});

export const AuthApi = Axios.create({
    baseURL: serverURL + "/auth",
});