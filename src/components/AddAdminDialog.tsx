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
import authService from "../services/authService";

interface AddAdminDialogProps {
  newAdmin: { email: string; password: string };
  setNewAdmin: React.Dispatch<
    React.SetStateAction<{ email: string; password: string }>
  >;
  onAdminAdded: (email: string) => void;
}

const AddAdminDialog: React.FC<AddAdminDialogProps> = ({
  newAdmin,
  setNewAdmin,
  onAdminAdded,
}) => {
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFields = () => {
    if (!newAdmin.email || !newAdmin.password) {
      setError("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(newAdmin.email)) {
      setError("Invalid email address.");
      return false;
    }
    return true;
  };

  const onAddAdminClick = async () => {
    if (!validateFields()) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await authService.register(
        newAdmin.email,
        newAdmin.password
      );
      if (response.status === 201) {
        onAdminAdded(newAdmin.email);
        setIsOpen(false);
        setNewAdmin({ email: "", password: "" });
      }else {
        setError("Unexpected error occurred.");
      }
    } catch (err) {
      if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        (err as { status?: number }).status === 409
      ) {
        setError("Admin already exists.");
      } else if (
        err &&
        typeof err === "object" &&
        "status" in err &&
        (err as { status?: number }).status === 500
      ) {
        setError("Server error. Please try again later.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger>
        <Button onClick={() => setIsOpen(true)} style={{ cursor: "pointer" }}>
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
              <Flex align="center" gap="2">
                <InfoCircledIcon />
                <Text color="red">{error}</Text>
              </Flex>
            </Callout.Root>
          )}

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
            <Button
              onClick={() => {
                setError("");
              }}
              variant="soft"
              color="gray"
              style={{ cursor: "pointer" }}
            >
              Cancel
            </Button>
          </Dialog.Close>
          <Button
            onClick={onAddAdminClick}
            disabled={isSubmitting}
            style={{ cursor: "pointer" }}
          >
            {isSubmitting ? "Adding..." : "Add"}
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default AddAdminDialog;
