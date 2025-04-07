import {
  Badge,
  Button,
  Code,
  DataList,
  Dialog,
  Flex,
  Grid,
  TabNav,
  Text,
  TextField,
} from "@radix-ui/themes";

const AdminRegister: React.FC = () => {
  return (
    <>
      <div className="w-8/12 mx-auto">
        <TabNav.Root>
          <TabNav.Link href="#/home">Home</TabNav.Link>
          <TabNav.Link href="#/admin-register" active>
            Admin registration
          </TabNav.Link>
          <TabNav.Link href="#/user-management">User management</TabNav.Link>
        </TabNav.Root>

        <div className="mt-10 ml-10">
          <Dialog.Root>
            <Dialog.Trigger>
              <Button>Add Admin</Button>
            </Dialog.Trigger>

            <Dialog.Content maxWidth="450px">
              <Dialog.Title>Add Admin</Dialog.Title>
              <Dialog.Description size="2" mb="4">
                Fill in the form below to add a new admin to the system.
              </Dialog.Description>

              <Flex direction="column" gap="3">
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Username
                  </Text>
                  <TextField.Root placeholder="Username" />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Email
                  </Text>
                  <TextField.Root placeholder="Email" />
                </label>
                <label>
                  <Text as="div" size="2" mb="1" weight="bold">
                    Password
                  </Text>
                  <TextField.Root placeholder="Password" />
                </label>
              </Flex>

              <Flex gap="3" mt="4" justify="end">
                <Dialog.Close>
                  <Button variant="soft" color="gray">
                    Cancel
                  </Button>
                </Dialog.Close>
                <Dialog.Close>
                  <Button>Add</Button>
                </Dialog.Close>
              </Flex>
            </Dialog.Content>
          </Dialog.Root>
        </div>

        <Grid
          columns="3"
          gap="3"
          rows="repeat(2, 64px)"
          width="auto"
          className="mt-10 ml-10"
        >
          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="88px">ID</DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">1</Code>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Username</DataList.Label>
              <DataList.Value>Eve</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Email</DataList.Label>
              <DataList.Value>eve.holt@reqres.in</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Status</DataList.Label>
              <DataList.Value>
                <Badge color="jade" variant="soft" radius="full">
                  Authorized
                </Badge>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
          <DataList.Root>
            <DataList.Item>
              <DataList.Label minWidth="88px">ID</DataList.Label>
              <DataList.Value>
                <Flex align="center" gap="2">
                  <Code variant="ghost">2</Code>
                </Flex>
              </DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Username</DataList.Label>
              <DataList.Value>TestUser</DataList.Value>
            </DataList.Item>
            <DataList.Item>
              <DataList.Label minWidth="88px">Email</DataList.Label>
              <DataList.Value>test@gmail.com</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
              <DataList.Label minWidth="88px">Status</DataList.Label>
              <DataList.Value>
                <Badge color="red" variant="soft" radius="full">
                  Blocked
                </Badge>
              </DataList.Value>
            </DataList.Item>
          </DataList.Root>
        </Grid>
      </div>
    </>
  );
};

export default AdminRegister;
