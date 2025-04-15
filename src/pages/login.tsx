import { useState } from "react";
import authService from "../services/authService";
import { Callout, Spinner, Theme } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const Login: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        (err as { status?: number }).status === 404
      ) {
        setError("User not found. Please check your email.");
      } else if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        (err as { status?: number }).status === 401
      ) {
        setError("Invalid password. Please try again.");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Theme className="bg-gray-900 text-white">
        <div className="h-screen flex flex-col items-center justify-center px-4">
          {error ? (
            <Callout.Root color="tomato" size="1" className="max-w-sm w-full">
              <Callout.Icon>
                <InfoCircledIcon />
              </Callout.Icon>
              <Callout.Text>{error}</Callout.Text>
            </Callout.Root>
          ) : null}
          <div className="text-white p-5 w-full max-w-sm rounded-lg flex flex-col items-center justify-center space-y-2 border-2 border-gray-500 bg-gray-800">
            <img src="/classconnect-logo.png" alt="classconnect-logo" />
            <h1 className="text-white text-lg font-bold">backoffice</h1>
            <h2 className="text-white text-sm">Sign in to your account</h2>
            <form onSubmit={handleLogin} className="w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="" className="self-start text-sm">
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="bg-white text-black p-2 rounded mb-4 mt-2"
                  required
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <label htmlFor="" className="self-start text-sm">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="bg-white text-black p-2 rounded mb-4 mt-2"
                  required
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`p-2 rounded w-full cursor-pointer transition mt-4 flex items-center justify-center
                        ${
                          isLoading
                            ? "bg-black cursor-wait"
                            : "bg-gray-600 hover:bg-green-600 text-white"
                        }`}
                >
                  {isLoading ? <Spinner size="3" /> : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Theme>
    </>
  );
};

export default Login;
