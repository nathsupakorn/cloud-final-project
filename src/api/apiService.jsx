import axios from 'axios';

axios.defaults.baseURL = "https://p6wrlmzn9d.execute-api.us-east-2.amazonaws.com";

export const getFacePredict = async (base64String) => {
    const payload = JSON.stringify({
        image: base64String
    });
    try {
        const response = await axios.post(
            'https://p6wrlmzn9d.execute-api.us-east-2.amazonaws.com/predict', 
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
            "https://p6wrlmzn9d.execute-api.us-east-2.amazonaws.com/getImage",
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

