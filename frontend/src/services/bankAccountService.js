import api from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
    }
});

export const addBankAccount = async (bank) => {

    const response = await api.post(
        "/bank/add",
        bank,
        getAuthHeader()
    );

    return response.data;
};