import { Grid, Spinner, TabNav } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import AddAdminDialog from "../components/AddAdminDialog";
import AdminCard from "../components/AdminCard";

interface Admin {
  username: string;
  email: string;
  status: "Authorized" | "Blocked";
}

const AdminRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    // TODO! Fetch the list of admins from the API
    // Simulating an API call with a timeout
    const timeout = setTimeout(() => {
      setIsLoading(false);
      setAdmins([
        {
          username: "Eve",
          email: "eve.holt@reqres.in",
          status: "Authorized",
        },
        {
          username: "TestUser",
          email: "test@gmail.com",
          status: "Blocked",
        },
      ]);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleAddAdmin = () => {
    //TODO! Add API call to register the new admin
    setAdmins([
      ...admins,
      {
        username: newAdmin.username,
        email: newAdmin.email,
        status: "Authorized",
      },
    ]);
    setNewAdmin({ username: "", email: "", password: "" });
  };

  return (
    <div className="w-8/12 mx-auto">
      <TabNav.Root>
        <TabNav.Link href="#/home">Home</TabNav.Link>
        <TabNav.Link href="#/admin-register" active>
          Admin registration
        </TabNav.Link>
        <TabNav.Link href="#/user-management">User management</TabNav.Link>
      </TabNav.Root>

      <div className="mt-10 ml-10">
        <AddAdminDialog
          newAdmin={newAdmin}
          setNewAdmin={setNewAdmin}
          handleAddAdmin={handleAddAdmin}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Spinner size="3" className="mt-10" />
        </div>
      ) : (
        <Grid columns="3" gap="4" width="auto" className="mt-10 ml-10">
          {admins.map((admin, index) => (
            <AdminCard
              key={index}
              username={admin.username}
              email={admin.email}
              status={admin.status}
            />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AdminRegister;
