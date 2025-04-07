import { TabNav } from "@radix-ui/themes";

const UserManagement: React.FC = () => {
  return (
    <>
      <div className="w-1/2 mx-auto">
        <TabNav.Root>
          <TabNav.Link href="#/home">Home</TabNav.Link>
          <TabNav.Link href="#/admin-register">
            Admin registration
          </TabNav.Link>
          <TabNav.Link href="#/user-management" active>User management</TabNav.Link>
        </TabNav.Root>
      </div>
    </>
  );
};

export default UserManagement;
