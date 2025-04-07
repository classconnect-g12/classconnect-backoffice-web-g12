import { TabNav } from "@radix-ui/themes";

const AdminRegister: React.FC = () => {
  return (
    <>
      <div className="w-1/2 mx-auto">
        <TabNav.Root>
          <TabNav.Link href="#/home">Home</TabNav.Link>
          <TabNav.Link href="#/admin-register" active>
            Admin registration
          </TabNav.Link>
          <TabNav.Link href="#/user-management">User management</TabNav.Link>
        </TabNav.Root>
      </div>
    </>
  );
};

export default AdminRegister;
