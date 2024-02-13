import Axios from 'axios';

export default Axios.create({
    baseURL: process.env.EXPO_PUBLIC_SERVER_URL
});