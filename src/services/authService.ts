import axios from 'axios';

const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://classconnect-api-gateway-g12-production.up.railway.app/admin/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error logging in!", error);
    throw error;
  }
}

const register = async (email: string, password: string) => {
  try {
    const response = await axios.post('https://classconnect-api-gateway-g12-production.up.railway.app/admin/auth/register',
      {email,
      password},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("There was an error registering!", error);
    throw error;
  }
}

export default {
  login,
  register,
};