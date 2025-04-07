import axios from 'axios';

const login = async (username: string, password: string) => {
  try {
    const response = await axios.post('https://reqres.in/api/login', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("There was an error logging in!", error);
  }
}

export default login;