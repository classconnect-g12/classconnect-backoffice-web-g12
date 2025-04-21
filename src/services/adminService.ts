import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT_PAGE = Number(import.meta.env.VITE_LIMIT_PAGE);

export const getAdmins = async (numberPage: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/admins?page=${numberPage}&limit=${LIMIT_PAGE}`,
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
