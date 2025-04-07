const Login: React.FC = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
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
              />
              <div className="flex flex-row justify-between">
                <label htmlFor="" className="self-start">
                  Admin password
                </label>
                <a
                  href=""
                  className="text-blue-500 underline underline-offset-2"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                className="bg-white text-black p-2 rounded mb-4 mt-2"
                required
              />
              <button
                type="submit"
                className="bg-gray-700 text-white p-2 rounded w-full cursor-pointer hover:bg-gray-600 transition mt-4"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
