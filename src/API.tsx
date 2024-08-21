import axios from "axios";

export const appURL = 
    process.env.NODE_ENV === "production"
        ? "https://ecommerce-react.vercel.app/"
        : "http://192.168.5.93/expense-tracker-backend/public/";

export const apiURL =
    process.env.NODE_ENV === "production"
        ? "https://ecommerce-backend-apis.vercel.app/api"
        : "http://192.168.5.93/expense-tracker-backend/public/api";

export const imageURL =
    process.env.NODE_ENV === "production"
        ? "https://ecommerce-backend-apis.vercel.app/uploads/"
        : "http://192.168.5.93/expense-tracker-backend/public/uploads/";

const axiosInstance = axios.create({
    baseURL: apiURL,
    timeout: 300000
});

// User Login
export function loginUser(data: { email: string, password: string }) {
    return axiosInstance.post(`/login`, data);
}

// User Signup
export function signUpUser(data: { name: string, email: string, password: string }) {
    return axiosInstance.post(`/register`, data);
}

// User Profile
export function getUser(token: string) {
    return axiosInstance.get(`/profile`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getAllCategories(token: string) {
    return axiosInstance.get(`/categories`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getAllPayModes(token: string) {
    return axiosInstance.get(`/pay_modes`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function insertTransaction(data: any, token: string) {
    return axiosInstance.post(`/transactions`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getAllTransactions(token: string) {
    return axiosInstance.get(`/transactions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getMonthlyTransactions(token: string) {
    return axiosInstance.get(`/monthly_transactions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getYearlyTransactions(token: string) {
    return axiosInstance.get(`/yearly_transactions`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}