import { DataList } from "@radix-ui/themes";

interface AdminCardProps {
  email: string;
}

const AdminCard: React.FC<AdminCardProps> = ({ email }) => (
  <div className="border rounded-2xl shadow-md p-4 bg-white">
    <DataList.Root>
      <DataList.Item>
        <DataList.Value>{email}</DataList.Value>
      </DataList.Item>
    </DataList.Root>
  </div>
);

export default AdminCard;
