import axios from "axios";

export const getAdmins = async () => {
  try {
    const response = await axios.get("https://classconnect-api-gateway-g12-production.up.railway.app/admin/admins",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};