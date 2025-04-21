import React, { useEffect, useState } from "react";
import { TextField, Callout, Flex, Text } from "@radix-ui/themes";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import UserTable from "../components/UserTable";
import { User } from "../types/user";
import { getUsers } from "../services/userService";
import TabNavigation from "../components/TabNavigation";
import sessionService from "../services/sessionService";
import { useSearchParams } from "react-router-dom";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState<number>(1);

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers(currentPage - 1);
        if (response && response.users && response.pagination) {
          const total = response.pagination.total_pages;
          setUsers(response.users);
          setTotalPages(total);

          if (currentPage > total && total > 0) {
            setSearchParams({ page: String(total) });
          }
          if (currentPage < 1) {
            setSearchParams({ page: "1" });
          }
        } else {
          setError("No users found");
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
      }
    };

    fetchUsers();
  }, [currentPage, setSearchParams]);

  const handleEditUser = (updatedUser: User) => {
    if (!users) return;
    setUsers(
      users.map((u) =>
        u.user_name === updatedUser.user_name ? updatedUser : u
      )
    );
  };

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
      <TabNavigation activeTab="user-management" />

      <div className="flex justify-end mt-10">
        <TextField.Root placeholder="Search the users…" className="w-64">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>

      {error && (
        <Callout.Root color="red">
          <Flex align="center" gap="2">
            <InfoCircledIcon />
            <Text color="red">{error}</Text>
          </Flex>
        </Callout.Root>
      )}
      <div className="mt-10">
        <UserTable users={users} onEdit={handleEditUser} />
      </div>

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

export default UserManagement;
