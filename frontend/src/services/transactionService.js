import api from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getRecentTransactions = async () => {

    const response = await api.get(
        "/dashboard/recent-transactions",
        getAuthHeader()
    );

    return response.data;
};

export const addTransaction = async (transaction) => {

    const response = await api.post(
        "/transactions/add",   // ✅ FIXED
        transaction,
        getAuthHeader()
    );

    return response.data;
};

export const getBankDropdown = async () => {

    const response = await api.get(
        "/dashboard/bank-dropdown",
        getAuthHeader()
    );

    return response.data;
};