import axios from 'axios';
import API_BASE_URL from './config';

axios.defaults.baseURL = API_BASE_URL;

export const getFacePredict = async (base64String) => {
    const payload = JSON.stringify({
        image: base64String
    });
    try {
        const response = await axios.post(
            `${API_BASE_URL}/predict-emotion`, 
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data.body;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getRefImage = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/getImage`,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getPredictScore = async (base64String) => {
    const payload = JSON.stringify({
        image: base64String
    });
    try {
        const response = await axios.post(
            `${API_BASE_URL}/predict-posture`,
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.message);
    }
};
