import React, { useEffect, useState } from "react";
import { TextField, TabNav, Callout, Flex, Text } from "@radix-ui/themes";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import UserTable from "../components/UserTable";
import { User } from "../types/user";
import { getUsers } from "../services/userService";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log("Fetching users from API...");
        const response = await getUsers();
        if (response) {
          setUsers(response);
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
          window.location.href = "/";
        }
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (updatedUser: User) => {
    if (!users) return;
    setUsers(
      users.map((u) =>
        u.user_name === updatedUser.user_name ? updatedUser : u
      )
    );
  };

  return (
    <div className="w-8/12 mx-auto">
      <TabNav.Root>
        <TabNav.Link href="#/home">Home</TabNav.Link>
        <TabNav.Link href="#/admin-register">Admin registration</TabNav.Link>
        <TabNav.Link href="#/user-management" active>
          User management
        </TabNav.Link>
      </TabNav.Root>

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
    </div>
  );
};

export default UserManagement;
