import Axios from 'axios';

const localhost = process.env.EXPO_PUBLIC_LOCAL_SERVER_URL || "http://localhost:8000";
export const serverURL = process.env.EXPO_PUBLIC_PROD == 1 ? process.env.EXPO_PUBLIC_PROD_SERVER_URL : localhost;

console.log("Server URL: ", serverURL);

export default Axios.create({
    baseURL: serverURL + "/api",
});

export const AuthApi = Axios.create({
    baseURL: serverURL + "/auth",
});