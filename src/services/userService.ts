import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT_PAGE = Number(import.meta.env.VITE_LIMIT_PAGE);

export const getUsers = async (numberPage: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/users?page=${numberPage}&limit=${LIMIT_PAGE}`,
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

export const EditUser = async (permissions: string, rol: string) => {
  try {
    const response = await axios.put("", {
      permissions,
      rol,
    });
    return response.data;
  } catch (error) {
    console.error("", error);
    throw error;
  }
};

export const blockUser = async (userId: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/ban/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

export const unblockUser = async (userId: number) => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/unban/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error unblocking user:", error);
    throw error;
  }
};
