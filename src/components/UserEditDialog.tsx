import React from "react";
import {
  Dialog,
  Button,
  Flex,
  Text,
  TextField,
  AlertDialog,
} from "@radix-ui/themes";
import { User } from "../types/user";

type Props = {
  user: User;
  onSave: (updatedUser: User) => void;
};

const UserEditDialog: React.FC<Props> = ({ user, onSave }) => {
  const [email, setEmail] = React.useState("");

  const handleSave = () => {
    // TODO! Make API call to update user details
    onSave({ ...user, email });
  };

  return (
    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Edit user</Dialog.Title>
      <Dialog.Description size="2" mb="4">
        Make changes to {user.user_name}'s profile.
      </Dialog.Description>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" size="2" mb="1" weight="bold">
            Email
          </Text>
          <TextField.Root
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </Flex>

      <Flex gap="3" mt="4" justify="end">
        <Dialog.Close>
          <Button variant="soft" color="gray" style={{ cursor: "pointer" }}>
            Cancel
          </Button>
        </Dialog.Close>

        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="solid" style={{ cursor: "pointer" }}>
              Save
            </Button>
          </AlertDialog.Trigger>

          <AlertDialog.Content maxWidth="450px">
            <AlertDialog.Title>Confirm changes</AlertDialog.Title>
            <AlertDialog.Description size="2">
              Are you sure you want to save these changes?
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
              <AlertDialog.Cancel>
                <Button
                  variant="soft"
                  color="gray"
                  style={{ cursor: "pointer" }}
                >
                  Cancel
                </Button>
              </AlertDialog.Cancel>
              <AlertDialog.Action>
                <Dialog.Close>
                  <Button
                    onClick={handleSave}
                    color="red"
                    style={{ cursor: "pointer" }}
                  >
                    Confirm Save
                  </Button>
                </Dialog.Close>
              </AlertDialog.Action>
            </Flex>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Flex>
    </Dialog.Content>
  );
};

export default UserEditDialog;
