import axios from 'axios';

const API_URL = 'http://192.168.1.15:8080/api';

export const getHelloMessage = async () => {
    const response = await axios.get(`${API_URL}/hello`);
    console.log(response);
    console.log("response");
    return response.data;
};