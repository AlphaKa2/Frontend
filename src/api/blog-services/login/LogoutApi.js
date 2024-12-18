import axiosInstance from "../../Config";

const logoutApi = async () => {
  try {
    const response = await axiosInstance.post("/auth-service/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error in logout API:", error);
    throw error;
  }
};

export default logoutApi;
