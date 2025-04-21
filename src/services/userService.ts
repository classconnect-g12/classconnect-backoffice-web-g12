import axios from "axios";

const LIMIT_PAGE: number = 5;

export const getUsers = async (numberPage: number) => {
  try {
    const response = await axios.get(`https://classconnect-api-gateway-g12-production.up.railway.app/admin/users?page=${numberPage}&limit=${LIMIT_PAGE}`,
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
      `https://classconnect-api-gateway-g12-production.up.railway.app/admin/ban/${userId}`,
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
}


export const unblockUser = async (userId: number) => {
  try {
    const response = await axios.post(
      `https://classconnect-api-gateway-g12-production.up.railway.app/admin/unban/${userId}`,
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
}
