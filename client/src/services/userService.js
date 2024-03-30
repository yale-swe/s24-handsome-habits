import api from "./apiUtil";

export async function findUserFromRequest() {
    console.log("Trying to find user");
    try {
        const response = await api.get("/api/user", {
            withCredentials: true,
        });

        if (response.data.user) {
            return response.data.user;
        }
        return null;
    } catch (error) {
        return null;
    }
}