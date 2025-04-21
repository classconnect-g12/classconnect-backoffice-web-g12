import axios from "axios";

const LIMIT_PAGE: number = 5;

export const getAdmins = async (numberPage: number) => {
  try {
    const response = await axios.get(`https://classconnect-api-gateway-g12-production.up.railway.app/admin/admins?page=${numberPage}&limit=${LIMIT_PAGE}`,
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