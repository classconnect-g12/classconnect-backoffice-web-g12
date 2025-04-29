import { useState } from "react";
import authService from "../services/authService";
import { Callout, Spinner } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT_PAGE = Number(import.meta.env.VITE_LIMIT_PAGE);

console.log("VITE_API_URL:", API_URL);
console.log("VITE_LIMIT_PAGE:", LIMIT_PAGE);

const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    const isValidEmail = /^\S+@\S+\.\S+$/.test(user.email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await authService.login(user.email, user.password);
      if (response && response.token) {
        localStorage.setItem("token", response.token);
        window.location.href = "/#/home";
      }
    } catch (err) {
      interface ErrorResponse {
        response?: {
          data?: {
            detail?: string;
          };
        };
      }
      const detail =
        (err as ErrorResponse)?.response?.data?.detail ||
        "An unexpected error occurred.";
      setError(detail);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center px-4">
        <div className="p-5 w-full max-w-sm rounded-lg flex flex-col items-center justify-center border-2 border-gray-500 shadow-2xl bg-white">
          <img src="/classconnect-logo.png" alt="classconnect-logo" />
          <h1 className="text-lg font-bold">backoffice</h1>
          <h2 className="text-sm">Sign in to your account</h2>
          <form onSubmit={handleLogin} className="w-full">
            {error ? (
              <Callout.Root
                color="tomato"
                size="1"
                className="max-w-sm w-full mt-2 mb-2"
              >
                <Callout.Icon>
                  <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>{error}</Callout.Text>
              </Callout.Root>
            ) : null}
            <div className="flex flex-col w-full">
              <label htmlFor="" className="self-start text-sm">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="border-1 border-gray-500 p-2 rounded mb-4 mt-2 placeholder:text-sm text-sm"
                required
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <label htmlFor="" className="self-start text-sm">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-1 border-gray-500 p-2 rounded mb-4 mt-2 placeholder:text-sm text-sm w-full pr-10"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 pb-2 transform -translate-y-1/2 text-gray-600 hover:text-black"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`p-2 rounded w-full cursor-pointer transition mt-4 flex items-center justify-center
                  ${
                    isLoading
                      ? "bg-black text-white cursor-wait"
                      : "bg-gray-600 hover:bg-green-600 text-white"
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
