import { Link } from "react-router-dom";
import TabNavigation from "../components/TabNavigation";

const Home: React.FC = () => {
  return (
    <>
      <div className="min-h-screen">
        <div className="w-8/12 mx-auto">
          <TabNavigation activeTab="home" />

          <div className="mt-4 p-4 border border-gray-300 rounded-md shadow-md bg-white">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome to the Admin Panel
            </h1>
            <p className="mt-2 text-gray-600">
              This backoffice allows you to efficiently manage users and
              administrators in the system.
            </p>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                to="/user-management"
                className="p-4 border rounded-lg shadow-sm bg-gray-50 no-underline text-inherit hover:bg-gray-100 transition"
              >
                <h2 className="text-lg font-semibold">👤 User Management</h2>
                <p className="mt-1 text-gray-700">
                  View, edit, activate or deactivate user accounts. Keep your
                  platform under control by managing users efficiently.
                </p>
              </Link>

              <Link
                to="/admin-register"
                className="p-4 border rounded-lg shadow-sm bg-gray-50 no-underline text-inherit hover:bg-gray-100 transition"
              >
                <h2 className="text-lg font-semibold">🛡️ Admin Registration</h2>
                <p className="mt-1 text-gray-700">
                  Register new administrators with special permissions to
                  monitor, audit, and manage the platform securely.
                </p>
              </Link>
            </div>

            <p className="text-sm text-gray-400 mt-8">
              Use the tabs above to navigate through the platform.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
