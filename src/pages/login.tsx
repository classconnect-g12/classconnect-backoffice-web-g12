import { useState } from "react";
import login from "../services/authService";
import { Spinner } from "@radix-ui/themes";

const Login: React.FC = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await login(user.username, user.password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "/#/home";
      }
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center px-4">
        <div className="text-white p-5 w-full max-w-sm rounded-lg flex flex-col items-center justify-center space-y-5 border-2 border-gray-500 bg-gray-800">
          <h1 className="text-white text-lg font-bold">
            ClassConnect backOffice
          </h1>
          <form onSubmit={handleLogin} className="w-full">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="self-start">
                Admin username
              </label>
              <input
                type="text"
                className="bg-white text-black p-2 rounded mb-4 mt-2"
                required
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
              />
              <label htmlFor="" className="self-start">
                Admin password
              </label>
              <input
                type="password"
                className="bg-white text-black p-2 rounded mb-4 mt-2"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <button
                type="submit"
                disabled={isLoading}
                className={`p-2 rounded w-full cursor-pointer transition mt-4 flex items-center justify-center
                        ${
                          isLoading
                            ? "bg-black cursor-wait"
                            : "bg-gray-600 hover:bg-red-600 text-white"
                        }`}
              >
                {isLoading ? <Spinner size="3" /> : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
