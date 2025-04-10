import axios from "axios";

export const getUsers = async () => {
  try {
    const response = await axios.get("/users");
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
