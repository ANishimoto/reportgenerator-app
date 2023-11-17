import axios from 'axios';

export default class Api {
    static async get(uri, options) {
        try {
            return await axios.get(uri, {
                ...options
            });
        } catch (error) {
            return error;
        }
    }

    static async post(uri, payload, options) {
        try {
            return await axios.post(uri, payload, {
                ...options
            });
        } catch (error) {
            return error;
        }
    }

    static async put(uri, payload, options) {
        try {
            return await axios.put(uri, payload, {
                ...options
            });
        } catch (error) {
            return error;
        }
    }

    static async delete(uri, options) {
        try {
            return await axios.delete(uri, {
                ...options
            });
        } catch (error) {
            return error;
        }
    }
}