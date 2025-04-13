import { Grid, Spinner, TabNav } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import AddAdminDialog from "../components/AddAdminDialog";
import AdminCard from "../components/AdminCard";

interface Admin {
  email: string;
}

const AdminRegister: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [newAdmin, setNewAdmin] = useState({
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
          email: "eve.holt@reqres.in",
        },
        {
          email: "test@gmail.com",
        },
      ]);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);

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
          onAdminAdded={(email) => setAdmins((prev) => [...prev, { email }])}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-10">
          <Spinner size="3" className="mt-10" />
        </div>
      ) : (
        <Grid columns="3" gap="4" width="auto" className="mt-10 ml-10">
          {admins.map((admin, index) => (
            <AdminCard key={index} email={admin.email} />
          ))}
        </Grid>
      )}
    </div>
  );
};

export default AdminRegister;
