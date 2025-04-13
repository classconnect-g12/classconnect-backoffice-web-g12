import React, { useEffect, useState } from "react";
import { TextField, TabNav } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import UserTable from "../components/UserTable";
import { User } from "../types/user";
import { getUsers } from "../services/userService";

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // TODO! Make errors more user-friendly

    const fetchUsers = async () => {
      try {
        console.log("Fetching users from API...");
        const response = await getUsers();
        if (response) {
          setUsers(response);
        } else {
          console.log("No users found");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
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

      <TextField.Root placeholder="Search the users…" className="mt-10">
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>

      <div className="mt-10">
        <UserTable users={users} onEdit={handleEditUser} />
      </div>
    </div>
  );
};

export default UserManagement;
