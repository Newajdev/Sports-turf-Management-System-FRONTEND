import { httpClient } from "@/lib/axios/httpClient";

const getTurfs = async () => {
    try {
        const response = await httpClient.get("/turf");
        return response;
    } catch (error) {
        console.error('Error fetching turfs:', error);
        throw error;
    }
};