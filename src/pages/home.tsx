import { TabNav } from "@radix-ui/themes";

const Home: React.FC = () => {
  return (
    <>
      <div className="w-1/2 mx-auto">
        <TabNav.Root>
          <TabNav.Link href="#/home" active>Home</TabNav.Link>
          <TabNav.Link href="#/admin-register">
            Admin registration
          </TabNav.Link>
          <TabNav.Link href="#/user-management">User management</TabNav.Link>
        </TabNav.Root>
      </div>
    </>
  );
};

export default Home;
