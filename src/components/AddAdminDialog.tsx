import { useState } from "react";
import { InfoCircledIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Button,
  Dialog,
  Flex,
  Text,
  TextField,
  Callout,
} from "@radix-ui/themes";

interface AddAdminDialogProps {
  newAdmin: { username: string; email: string; password: string };
  setNewAdmin: React.Dispatch<
    React.SetStateAction<{ username: string; email: string; password: string }>
  >;
  handleAddAdmin: () => void;
}

const AddAdminDialog: React.FC<AddAdminDialogProps> = ({
  newAdmin,
  setNewAdmin,
  handleAddAdmin,
}) => {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const validateFields = () => {
    if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newAdmin.email)) {
      setError("Invalid email address.");
      return false;
    }
    setError("");
    return true;
  };

  const onAddAdminClick = () => {
    if (validateFields()) {
      handleAddAdmin();
      setIsOpen(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button
          onClick={() => setIsOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <PlusIcon /> Add Administrator
        </Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Administrator</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Fill in the form below to add a new admin to the system.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          {error && (
            <Callout.Root color="red">
              <Callout.Text>
                <Flex align="center" gap="2">
                  <InfoCircledIcon />
                  {error}
                </Flex>
              </Callout.Text>
            </Callout.Root>
          )}

          <label>
            <Text size="2" mb="1" weight="bold">
              Username
            </Text>
            <TextField.Root
              autoFocus
              type="text"
              value={newAdmin.username}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, username: e.target.value })
              }
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Root
              type="email"
              value={newAdmin.email}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />
          </label>
          <label>
            <Text size="2" mb="1" weight="bold">
              Password
            </Text>
            <TextField.Root
              type="password"
              value={newAdmin.password}
              onChange={(e) =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button onClick={() => setError("")} variant="soft" color="gray" style={{ cursor: "pointer" }}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={onAddAdminClick} style={{ cursor: "pointer" }}>
            Add
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddAdminDialog;
