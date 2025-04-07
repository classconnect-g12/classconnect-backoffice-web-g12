import { TabNav } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import sessionService from "../services/sessionService";

const Home: React.FC = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionService.clearSession();
    navigate("/");
  }

  return (
    <>
      <div className="w-1/2 mx-auto">
        <TabNav.Root>
          <TabNav.Link href="#/home" active>Home</TabNav.Link>
          <TabNav.Link href="#/admin-register">
            Admin registration
          </TabNav.Link>
          <TabNav.Link href="#/user-management">User management</TabNav.Link>
          <TabNav.Link href="#/" onClick={handleLogout}>
            <span className="text-red-500">Logout</span>
          </TabNav.Link>
        </TabNav.Root>
      </div>
    </>
  );
};

export default Home;
