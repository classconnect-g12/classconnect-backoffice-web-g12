import { useEffect, useState } from "react";
import AddAdminDialog from "../components/AddAdminDialog";
import TabNavigation from "../components/TabNavigation";
import { getAdmins } from "../services/adminService";
import sessionService from "../services/sessionService";
import AdminTable from "../components/AdminTable";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(1);

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await getAdmins(currentPage - 1);
        if (response && response.admins && response.pagination) {
          const total = response.pagination.total_pages;
          setAdmins(response.admins);
          setTotalPages(total);

          if (currentPage > total && total > 0) {
            setSearchParams({ page: String(total) });
          }
          if (currentPage < 1) {
            setSearchParams({ page: "1" });
          }
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
  }, [currentPage, setSearchParams]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: String(currentPage + 1) });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

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

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div>
          <p className="font-medium text-gray-800">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </p>
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminRegister;
