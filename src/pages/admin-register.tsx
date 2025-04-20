import { useEffect, useState } from "react";
import AddAdminDialog from "../components/AddAdminDialog";
import TabNavigation from "../components/TabNavigation";
import { getAdmins } from "../services/adminService";
import sessionService from "../services/sessionService";
import AdminTable from "../components/AdminTable";

interface Admin {
  id: string;
  email: string;
  role: string;
}

const AdminRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        console.log("Fetching admins from API...");
        const response = await getAdmins();
        if (response) {
          setAdmins(response);
        } else {
          setError("No admins found");
        }
      } catch (error) {
        if (
          error &&
          typeof error === "object" &&
          "status" in error &&
          (error as { status?: number }).status === 401
        ) {
          setError("Error. Your session has expired. Please log in again.");
          sessionService.clearSession();
          window.location.href = "/";
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-8/12 mx-auto">
      <TabNavigation activeTab="admin-register" />

      <div className="mt-10 ml-10">
        <AddAdminDialog
          newAdmin={newAdmin}
          setNewAdmin={setNewAdmin}
          onAdminAdded={(email) =>
            setAdmins((prev) => [
              ...prev,
              {
                id: crypto.randomUUID(),
                email,
                role: "ADMIN",
              },
            ])
          }
        />
      </div>

      {error && <div className="text-red-500 text-center mt-4">{error}</div>}

      <AdminTable admins={admins} isLoading={isLoading} />
    </div>
  );
};

export default AdminRegister;
