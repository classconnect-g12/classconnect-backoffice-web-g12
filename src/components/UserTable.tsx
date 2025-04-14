import React from "react";
import { Table, Skeleton, Badge, Dialog, AlertDialog } from "@radix-ui/themes";
import {
  LockClosedIcon,
  LockOpen1Icon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import UserEditDialog from "./UserEditDialog";
import { User } from "../types/user";
import { blockUser } from "../services/userService";
import { unblockUser } from "../services/userService";
import toast from "react-hot-toast";

type Props = {
  users: User[] | null;
  onEdit: (user: User) => void;
};

const UserTable: React.FC<Props> = ({ users, onEdit }) => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const renderSkeletonRow = (key: number) => (
    <Table.Row key={key}>
      {[...Array(7)].map((_, i) => (
        <Table.Cell key={i}>
          <Skeleton className="h-4 w-24" />
        </Table.Cell>
      ))}
      <Table.Cell key="action">
        <Skeleton className="h-4 w-6" />
      </Table.Cell>
    </Table.Row>
  );

  const handleToggleBlock = async (user: User) => {
    if (!user.banned) {
      const response = await blockUser(user.id);
      if (response.status === 200) {
        toast.success("User blocked successfully.");
      } else if (response.status === 401) {
        toast.error("You are not authorized to perform this action.");
      } else if (response.status === 403) {
        toast.error("You are not allowed to perform this action.");
      } else if (response.status === 404) {
        toast.error("User not found.");
      } else {
        console.error("Failed to block user.");
      }
    } else {
      const response = await unblockUser(user.id);
      if (response.status === 200) {
        toast.success("User unblocked successfully.");
      } else if (response.status === 401) { 
        toast.error("You are not authorized to perform this action.");
      } else if (response.status === 403) {
        toast.error("You are not allowed to perform this action.");
      } else if (response.status === 404) {
        toast.error("User not found.");
      } else {
        console.error("Failed to unblock user.");
      }
    }
    const updatedUser: User = {
      ...user,
      banned: !user.banned,
    };
    onEdit(updatedUser);
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>First Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!users
          ? Array.from({ length: 3 }).map((_, idx) => renderSkeletonRow(idx))
          : users.map((user) => {
              const state = user.banned ? "Blocked" : "Active";
              return (
                <Table.Row key={user.id}>
                  <Table.RowHeaderCell>{user.id}</Table.RowHeaderCell>
                  <Table.Cell>{user.user_name}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>{user.role}</Table.Cell>
                  <Table.Cell>{user.first_name}</Table.Cell>
                  <Table.Cell>{user.last_name}</Table.Cell>
                  <Table.Cell>
                    <Badge color={state === "Active" ? "green" : "red"}>
                      {state}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Dialog.Root>
                        <Dialog.Trigger>
                          <Pencil1Icon
                            className="w-6 h-6 p-1 border text-blue-500 rounded cursor-pointer hover:border-green-500 hover:text-green-500 transition"
                            onClick={() => setSelectedUser(user)}
                          />
                        </Dialog.Trigger>
                        {selectedUser?.user_name === user.user_name && (
                          <UserEditDialog
                            user={selectedUser}
                            onSave={(updatedUser) => {
                              onEdit(updatedUser);
                              setSelectedUser(null);
                            }}
                          />
                        )}
                      </Dialog.Root>

                      <AlertDialog.Root>
                        <AlertDialog.Trigger>
                          {state === "Active" ? (
                            <LockClosedIcon className="w-6 h-6 p-1 border text-red-500 rounded cursor-pointer hover:border-red-700 hover:text-red-700 transition" />
                          ) : (
                            <LockOpen1Icon className="w-6 h-6 p-1 border text-green-500 rounded cursor-pointer hover:border-green-700 hover:text-green-700 transition" />
                          )}
                        </AlertDialog.Trigger>

                        <AlertDialog.Content maxWidth="450px">
                          <AlertDialog.Title>
                            {state === "Active" ? "Block user" : "Unblock user"}
                          </AlertDialog.Title>
                          <AlertDialog.Description size="2">
                            {state === "Active"
                              ? `Are you sure you want to block ${user.user_name}? They will lose access to the system.`
                              : `Do you want to unblock ${user.user_name} and restore access?`}
                          </AlertDialog.Description>

                          <div className="flex justify-end gap-3 mt-4">
                            <AlertDialog.Cancel>
                              <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 cursor-pointer">
                                Cancel
                              </button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                              <button
                                className={`px-3 py-1 rounded text-white cursor-pointer ${
                                  state === "Active"
                                    ? "bg-red-500 hover:bg-red-600"
                                    : "bg-green-500 hover:bg-green-600"
                                }`}
                                onClick={() => handleToggleBlock(user)}
                              >
                                Confirm
                              </button>
                            </AlertDialog.Action>
                          </div>
                        </AlertDialog.Content>
                      </AlertDialog.Root>
                    </div>
                  </Table.Cell>
                </Table.Row>
              );
            })}
      </Table.Body>
    </Table.Root>
  );
};

export default UserTable;
