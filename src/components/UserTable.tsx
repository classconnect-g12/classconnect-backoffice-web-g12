import React from "react";
import { Table, Skeleton, Badge, Dialog, AlertDialog } from "@radix-ui/themes";
import {
  LockClosedIcon,
  LockOpen1Icon,
  Pencil1Icon,
} from "@radix-ui/react-icons";
import UserEditDialog from "./UserEditDialog";
import { User } from "../types/user";

type Props = {
  users: User[] | null;
  onEdit: (user: User) => void;
};

const UserTable: React.FC<Props> = ({ users, onEdit }) => {
  const [selectedUser, setSelectedUser] = React.useState<User | null>(null);

  const renderSkeletonRow = () => (
    <Table.Row>
      {[...Array(7)].map((_, i) => (
        <Table.Cell key={i}>
          <Skeleton className="h-4 w-24" />
        </Table.Cell>
      ))}
      <Table.Cell>
        <Skeleton className="h-4 w-6" />
      </Table.Cell>
    </Table.Row>
  );

  const handleToggleBlock = (user: User) => {
    // TODO! Make API call to update user state
    // await userService.updateUserState(user.username, updatedUser.state);

    const updatedUser: User = {
      ...user,
      state:
        user.state === "Active"
          ? "Blocked"
          : ("Active" as "Active" | "Blocked"),
    };
    onEdit(updatedUser);
  };

  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>First name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Last name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Registration date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>State</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {!users
          ? Array.from({ length: 3 }).map((_, idx) => (
              <React.Fragment key={idx}>{renderSkeletonRow()}</React.Fragment>
            ))
          : users.map((user) => (
              <Table.Row key={user.username}>
                <Table.RowHeaderCell>{user.username}</Table.RowHeaderCell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
                <Table.Cell>{user.firstName}</Table.Cell>
                <Table.Cell>{user.lastName}</Table.Cell>
                <Table.Cell>{user.registrationDate}</Table.Cell>
                <Table.Cell>
                  <Badge color={user.state === "Active" ? "green" : "red"}>
                    {user.state}
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
                      {selectedUser?.username === user.username && (
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
                        {user.state === "Active" ? (
                          <LockClosedIcon className="w-6 h-6 p-1 border text-red-500 rounded cursor-pointer hover:border-red-700 hover:text-red-700 transition" />
                        ) : (
                          <LockOpen1Icon className="w-6 h-6 p-1 border text-green-500 rounded cursor-pointer hover:border-green-700 hover:text-green-700 transition" />
                        )}
                      </AlertDialog.Trigger>

                      <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>
                          {user.state === "Active"
                            ? "Block user"
                            : "Unblock user"}
                        </AlertDialog.Title>
                        <AlertDialog.Description size="2">
                          {user.state === "Active"
                            ? `Are you sure you want to block ${user.username}? They will lose access to the system.`
                            : `Do you want to unblock ${user.username} and restore access?`}
                        </AlertDialog.Description>

                        <div className="flex justify-end gap-3 mt-4">
                          <AlertDialog.Cancel>
                            <button className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                              Cancel
                            </button>
                          </AlertDialog.Cancel>
                          <AlertDialog.Action>
                            <button
                              className={`px-3 py-1 rounded text-white ${
                                user.state === "Active"
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
            ))}
      </Table.Body>
    </Table.Root>
  );
};

export default UserTable;
