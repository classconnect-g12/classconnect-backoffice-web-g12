import { Badge, DataList } from "@radix-ui/themes";

interface AdminCardProps {
  username: string;
  email: string;
  status: "Authorized" | "Blocked";
}

const AdminCard: React.FC<AdminCardProps> = ({ username, email, status }) => (
  <div className="border rounded-2xl shadow-md p-4 bg-white">
    <DataList.Root>
      <DataList.Item>
        <DataList.Label minWidth="88px">Email</DataList.Label>
        <DataList.Value>{email}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Username</DataList.Label>
        <DataList.Value>{username}</DataList.Value>
      </DataList.Item>
      <DataList.Item>
        <DataList.Label minWidth="88px">Status</DataList.Label>
        <DataList.Value>
          <Badge
            color={status === "Authorized" ? "jade" : "red"}
            variant="soft"
            radius="full"
          >
            {status}
          </Badge>
        </DataList.Value>
      </DataList.Item>
    </DataList.Root>
  </div>
);

export default AdminCard;
