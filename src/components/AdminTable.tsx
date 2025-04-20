import React from "react";
import { Table, Skeleton } from "@radix-ui/themes";

interface Admin {
  id: string;
  email: string;
  role: string;
}

type Props = {
  admins: Admin[] | null;
  isLoading: boolean;
};

const AdminTable: React.FC<Props> = ({ admins, isLoading }) => {
  const renderSkeletonRow = (key: number) => (
    <Table.Row key={key}>
      <Table.Cell>
        <Skeleton className="h-4 w-64" />
      </Table.Cell>
    </Table.Row>
  );

  return (
    <div className="rounded-2xl shadow-md p-6 bg-white mt-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Registered Admins
      </h2>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {isLoading
            ? Array.from({ length: 3 }).map((_, idx) => renderSkeletonRow(idx))
            : admins?.map((admin) => (
                <Table.Row key={admin.id}>
                  <Table.Cell>{admin.email}</Table.Cell>
                </Table.Row>
              ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default AdminTable;
