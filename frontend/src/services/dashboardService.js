import api from "../api/axiosConfig";

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const getForecast = async () => {

    const response = await api.get(
        "/dashboard/cash-flow-forecast",
        getAuthHeader()
    );

    return response.data;
};