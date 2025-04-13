import { TabNav } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import sessionService from "../services/sessionService";

interface TabNavigationProps {
  activeTab: "home" | "admin-register" | "user-management";
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionService.clearSession();
    navigate("/");
  };

  return (
    <TabNav.Root>
      <TabNav.Link href="#/home" active={activeTab === "home"}>
        Home
      </TabNav.Link>
      <TabNav.Link
        href="#/admin-register"
        active={activeTab === "admin-register"}
      >
        Admin registration
      </TabNav.Link>
      <TabNav.Link
        href="#/user-management"
        active={activeTab === "user-management"}
      >
        User management
      </TabNav.Link>
      <TabNav.Link href="#/" onClick={handleLogout}>
        <span className="text-red-500">Logout</span>
      </TabNav.Link>
    </TabNav.Root>
  );
};

export default TabNavigation;
