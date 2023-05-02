import axios from 'axios';

axios.defaults.baseURL = "https://ycptca22jf.execute-api.us-east-2.amazonaws.com/default";

export const getFacePredict = async (base64String) => {
    const payload = JSON.stringify({
        image: base64String
    });
    try {
        const response = await axios.post(
            'https://ycptca22jf.execute-api.us-east-2.amazonaws.com/default/predict-emotion', 
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
            "https://ycptca22jf.execute-api.us-east-2.amazonaws.com/default/getImage",
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
            "http://3.129.114.108:8000/predict",
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
