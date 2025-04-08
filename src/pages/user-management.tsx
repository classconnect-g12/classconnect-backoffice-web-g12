import React, { useState } from "react";
import { Skeleton, Table, TabNav, TextField } from "@radix-ui/themes";

type User = {
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  registrationDate: string;
  state: "Active" | "Inactive";
};

const UserManagement: React.FC = () => {

  const [users, setUsers] = useState<User[] | null>(null);

  const renderSkeletonRow = () => (
    <Table.Row>
      <Table.RowHeaderCell>
        <Skeleton className="h-4 w-24" />
      </Table.RowHeaderCell>
      <Table.Cell>
        <Skeleton className="h-4 w-40" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-24" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-20" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-24" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-28" />
      </Table.Cell>
      <Table.Cell>
        <Skeleton className="h-4 w-16" />
      </Table.Cell>
    </Table.Row>
  );

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
        <TextField.Slot> {/*<MagnifyingGlassIcon height="16" width="16" /> */}</TextField.Slot>
        
      </TextField.Root>
      <div className="mt-10">
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
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {!users
              ? Array.from({ length: 3 }).map((_, idx) => (
                  <React.Fragment key={idx}>
                    {renderSkeletonRow()}
                  </React.Fragment>
                ))
              : users.map((user) => (
                  <Table.Row key={user.username}>
                    <Table.RowHeaderCell>{user.username}</Table.RowHeaderCell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.role}</Table.Cell>
                    <Table.Cell>{user.firstName}</Table.Cell>
                    <Table.Cell>{user.lastName}</Table.Cell>
                    <Table.Cell>{user.registrationDate}</Table.Cell>
                    <Table.Cell>{user.state}</Table.Cell>
                  </Table.Row>
                ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default UserManagement;
