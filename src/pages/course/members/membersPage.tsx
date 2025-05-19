import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  Callout,
  Flex,
  Text,
  Table,
  Tooltip,
  Dialog,
  Button,
  Select,
  Checkbox,
} from "@radix-ui/themes";
import { Cross2Icon, InfoCircledIcon, Pencil2Icon } from "@radix-ui/react-icons";

import avatarDefault from "../../../assets/avatar-default.png";
import TabNavigation from "../../../components/TabNavigation";
import { getCourseMembers, updateCourseMembers } from "../../../services/courseService";

type Member = {
  user: {
    id: number;
    user_name: string;
    banner: string;
  };
  userRole: string;
  permissions: string[];
};

const PERMISSION_LABELS: Record<string, string> = {
  CREATE_ASSESSMENT: "Create assessment",
  CREATE_RESOURCE: "Create resource",
  CREATE_MODULE: "Create module",
  DELETE_COURSE: "Delete course",
  EDIT_COURSE: "Edit course",
  EDIT_MODULE: "Edit module",
  DELETE_MODULE: "Delete module",
  EDIT_RESOURCE: "Edit resource",
  DELETE_RESOURCE: "Delete resource",
  EDIT_ASSESSMENT: "Edit assessment",
  DELETE_ASSESMENT: "Delete assessment",
  REVIEW_ASSESSMENT: "Review assessment",
};

const ALL_PERMISSIONS = Object.keys(PERMISSION_LABELS);

export default function MembersPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const courseName = searchParams.get("name") || "Course";

  const [members, setMembers] = useState<Member[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editedMembers, setEditedMembers] = useState<Record<number, Member>>({});
  const [editing, setEditing] = useState<Member | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // 👈 NUEVO

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  useEffect(() => {
    if (!courseId) return;

    async function fetchMembers() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourseMembers(courseId!, currentPage - 1);
        setMembers(data.users || []);
        setTotalPages(data.pagination?.totalPages || 1);

        if (currentPage > (data.pagination?.totalPages || 1) && data.pagination?.totalPages) {
          setSearchParams({ page: String(data.pagination.totalPages), name: courseName });
        }
        if (currentPage < 1) {
          setSearchParams({ page: "1", name: courseName });
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load members.");
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, [courseId, currentPage, courseName, setSearchParams]);

  const handleEditSave = () => {
    if (!editing) return;

    const original = members.find((m) => m.user.id === editing.user.id);
    if (!original) return;

    const roleChanged = original.userRole !== editing.userRole;
    const originalPerms = [...original.permissions].sort().join(",");
    const editedPerms = [...editing.permissions].sort().join(",");
    const permissionsChanged = originalPerms !== editedPerms;

    if (roleChanged || permissionsChanged) {
      setEditedMembers((prev) => ({
        ...prev,
        [editing.user.id]: editing,
      }));
    } else {
      setEditedMembers((prev) => {
        const copy = { ...prev };
        delete copy[editing.user.id];
        return copy;
      });
    }

    setEditing(null);
  };

  const handlePermissionToggle = (permission: string) => {
    if (!editing) return;
    const updated = editing.permissions.includes(permission)
      ? editing.permissions.filter((p) => p !== permission)
      : [...editing.permissions, permission];
    setEditing({ ...editing, permissions: updated });
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1), name: courseName });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: String(currentPage + 1), name: courseName });
    }
  };

  const handleSaveAllChanges = async () => {
    try {
      const changes = Object.values(editedMembers);
      await updateCourseMembers(courseId!, changes);

      setEditedMembers({});
      setSearchParams({ page: String(currentPage), name: courseName });
    } catch (err) {
      interface ErrorResponse {
        response?: {
          data?: {
            detail?: string;
          };
        };
      }
      const detail =
        (err as ErrorResponse)?.response?.data?.detail ||
        "An unexpected error occurred.";
      setError(detail);
    }
  };

  return (
    <div className="w-8/12 mx-auto">
      <TabNavigation activeTab="course-management" />

      <h1 className="text-3xl font-bold mb-8 mt-8 text-center text-gray-800">
        Course: <span className="italic">{courseName}</span>
      </h1>

      {error && (
        <Callout.Root color="red" className="mb-4">
          <Flex align="center" gap="2">
            <InfoCircledIcon />
            <Text color="red">{error}</Text>
          </Flex>
        </Callout.Root>
      )}

      {loading ? (
        <div className="text-center py-10">Loading members...</div>
      ) : (
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Username</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Role</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Permissions</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={5} className="text-center">
                  No members found.
                </Table.Cell>
              </Table.Row>
            ) : (
              members.map((m) => (
                <Table.Row key={m.user.id}>
                  <Table.RowHeaderCell>{m.user.id}</Table.RowHeaderCell>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <img
                        src={m.user.banner || avatarDefault}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = avatarDefault;
                        }}
                        alt={m.user.user_name}
                        className="w-10 h-10 rounded-full object-cover border"
                      />
                      <span className="font-medium">{m.user.user_name}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{m.userRole}</Table.Cell>
                  <Table.Cell>
                    {m.permissions.length > 0
                      ? m.permissions.map((p) => PERMISSION_LABELS[p] || p).join(", ")
                      : "—"}
                  </Table.Cell>
                  <Table.Cell>
                    <Tooltip content="Edit role and permissions">
                      <Pencil2Icon
                        className="w-6 h-6 text-green-600 hover:text-green-800 cursor-pointer transition"
                        onClick={() => setEditing({ ...m })}
                      />
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      )}

      {/* Edit modal */}
      {editing && (
        <Dialog.Root open onOpenChange={() => setEditing(null)}>
          <Dialog.Content className="max-w-lg">
            <Dialog.Title>Edit Member</Dialog.Title>
            <Dialog.Description>
              Change the role and permissions of user{" "}
              <strong>{editing.user.user_name}</strong>.
            </Dialog.Description>

            <label className="block font-medium mt-4 mb-2">Role</label>
            <Select.Root
              value={editing.userRole}
              onValueChange={(value) => setEditing({ ...editing, userRole: value })}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Item value="STUDENT">Student</Select.Item>
                <Select.Item value="ASSISTANT">Assistant</Select.Item>
                <Select.Item value="TEACHER">Teacher</Select.Item>
              </Select.Content>
            </Select.Root>

            <label className="block font-medium mt-4 mb-2">Permissions</label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {ALL_PERMISSIONS.map((perm) => (
                <label key={perm} className="flex items-center gap-2">
                  <Checkbox
                    checked={editing.permissions.includes(perm)}
                    onCheckedChange={() => handlePermissionToggle(perm)}
                  />
                  <span>{PERMISSION_LABELS[perm]}</span>
                </label>
              ))}
            </div>

            <Flex justify="end" gap="3" mt="4">
              <Button variant="soft" color="gray" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button onClick={handleEditSave}>Save</Button>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      )}

      {/* Pending changes + confirm dialog */}
      <div className="mt-8 border rounded-xl p-5 bg-gray-50">
        <h2 className="text-xl font-semibold mb-3 text-gray-700">Pending changes</h2>
        <ul className="list-disc list-inside text-gray-800">
          {Object.values(editedMembers).map((m) => (
            <li key={m.user.id} className="flex items-center gap-2">
              <button
                onClick={() => {
                  setEditedMembers((prev) => {
                    const copy = { ...prev };
                    delete copy[m.user.id];
                    return copy;
                  });
                }}
                className="text-red-600 hover:text-red-800 focus:outline-none"
                aria-label={`Remove pending changes for ${m.user.user_name}`}
              >
                <Cross2Icon className="h-5 w-5" />
              </button>
              <strong>{m.user.user_name}</strong> – New role: {m.userRole}, Permissions:{" "}
              {m.permissions.map((p) => PERMISSION_LABELS[p] || p).join(", ") || "—"}
            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Button
            disabled={Object.keys(editedMembers).length === 0}
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => setConfirmDialogOpen(true)}
          >
            Save all changes
          </Button>
        </div>
      </div>

      {/* Confirm Save Dialog */}
      <Dialog.Root open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <Dialog.Content className="max-w-md">
          <Dialog.Title>Confirm Changes</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to apply all the pending changes? This will update the roles and permissions for selected members.
          </Dialog.Description>
          <Flex justify="end" gap="3" mt="4">
            <Button variant="soft" color="gray" onClick={() => setConfirmDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              color="green"
              onClick={() => {
                setConfirmDialogOpen(false);
                handleSaveAllChanges();
              }}
            >
              Confirm
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>
        <p className="font-medium text-gray-800">
          Page <span className="font-bold">{currentPage}</span> of{" "}
          <span className="font-bold">{totalPages}</span>
        </p>
        <button
          disabled={currentPage === totalPages}
          onClick={handleNextPage}
          className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
