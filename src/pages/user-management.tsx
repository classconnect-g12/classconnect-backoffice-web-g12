import React, { useEffect, useState } from "react";
import { TextField, TabNav } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import UserTable from "../components/UserTable";
import { User } from "../types/user";
import { getUsers } from "../services/userService";

const mockUsers: User[] = [
  {
    username: "jdoe",
    email: "jdoe@example.com",
    role: "Admin",
    firstName: "John",
    lastName: "Doe",
    registrationDate: "2024-11-01",
    state: "Active",
  },
  {
    username: "asmith",
    email: "asmith@example.com",
    role: "User",
    firstName: "Alice",
    lastName: "Smith",
    registrationDate: "2024-10-15",
    state: "Blocked",
  },
  {
    username: "bwayne",
    email: "bwayne@example.com",
    role: "Moderator",
    firstName: "Bruce",
    lastName: "Wayne",
    registrationDate: "2024-12-05",
    state: "Active",
  },
];

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    // TODO! Make errors more user-friendly

    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response && response.data) {
          setUsers(response.data);
        } else {
          console.log("No users found, using mock data.");
          setUsers(mockUsers);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers(mockUsers);
      }
    };

    fetchUsers();
  }, []);

  const handleEditUser = (updatedUser: User) => {
    if (!users) return;
    setUsers(
      users.map((u) => (u.username === updatedUser.username ? updatedUser : u))
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
