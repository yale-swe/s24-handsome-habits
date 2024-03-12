import Axios from 'axios';
import apiUtil from '../src/services/apiUtil.js';

// Mock the entire Axios module
jest.mock('axios', () => ({
    create: jest.fn().mockReturnValue({
        baseURL: "http://localhost:8000/api",
    }),
}));

describe('apiUtil Axios Instance', () => {
    it('is created with the correct baseURL', () => {
        // Ensure axios.create was called with the expected configuration
        expect(Axios.create).toHaveBeenCalledWith({
            baseURL: "http://localhost:8000/api",
        });

        // Verify the mocked axiosInstance has the expected baseURL
        expect(apiUtil.baseURL).toEqual("http://localhost:8000/api");
    });
});