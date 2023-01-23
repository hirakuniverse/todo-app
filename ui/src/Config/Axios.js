import axios from 'axios';
const AppService = {
    get: async (url) => {
        return await axios.get(url);
    },
    post: async (url, data) => {
        return await axios.post(url, data);
    },
    put: async (url, data) => {
        return await axios.put(url, data)
    },
    delete: async (url) => {
        return await axios.delete(url)
    }
}

export default AppService;
