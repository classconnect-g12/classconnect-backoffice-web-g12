import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { Table, Callout, Flex, Text } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import TabNavigation from "../../../components/TabNavigation";
import { PERMISSION_LABELS } from "../../../constants/permissions";
import { getCourseAuditLogs } from "../../../services/courseService";

type LogEntry = {
  courseId: string;
  adminEmail: string;
  action: string;
  affectedUserId: number;
  oldRole: string;
  newRole: string;
  oldPermissions: string[];
  newPermissions: string[];
  timestamp: string;
};

function areArraysEqual(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

export function CourseLogs() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const courseName = searchParams.get("name") ?? "Unknown Course";
  const logsPerPage = 5;

  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      if (!courseId) return;

      setLoading(true);
      setError("");

      try {
        const data = await getCourseAuditLogs(courseId, currentPage - 1, logsPerPage);
        setLogs(data.logs);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        console.error(err);
        setError("Failed to load audit logs.");
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [courseId, currentPage]);

  const goToPage = (page: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set("page", page.toString());
      return params;
    });
  };

  return (
    <div className="w-8/12 mx-auto">
      <TabNavigation activeTab="course-management" />

      <h1 className="text-2xl font-bold mt-10 mb-4 text-center">
        Audit Logs for: <span className="text-blue-600">{courseName}</span>
      </h1>

      {error ? (
        <Callout.Root color="red" className="mb-4">
          <Flex align="center" gap="2">
            <InfoCircledIcon />
            <Text>{error}</Text>
          </Flex>
        </Callout.Root>
      ) : loading ? (
        <Text className="text-center block mt-8">Loading...</Text>
      ) : logs.length === 0 ? (
        <Callout.Root color="orange">
          <Flex align="center" gap="2">
            <InfoCircledIcon />
            <Text>No audit logs found for this course.</Text>
          </Flex>
        </Callout.Root>
      ) : (
        <>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Timestamp</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Admin</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Affected User ID</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Old Role</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>New Role</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Old Permissions</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>New Permissions</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {logs.map((log, idx) => {
                const showRoleChange = log.oldRole !== log.newRole;
                const showPermissionChange = !areArraysEqual(log.oldPermissions, log.newPermissions);

                return (
                  <Table.Row key={idx}>
                    <Table.Cell>{new Date(log.timestamp).toLocaleString("en-CA")}</Table.Cell>
                    <Table.Cell>{log.adminEmail}</Table.Cell>
                    <Table.Cell>{log.action}</Table.Cell>
                    <Table.Cell>{log.affectedUserId}</Table.Cell>
                    <Table.Cell>{showRoleChange ? log.oldRole || "—" : "—"}</Table.Cell>
                    <Table.Cell>{showRoleChange ? log.newRole || "—" : "—"}</Table.Cell>
                    <Table.Cell>
                      {showPermissionChange && log.oldPermissions.length > 0
                        ? log.oldPermissions.map((p) => PERMISSION_LABELS[p] || p).join(", ")
                        : "—"}
                    </Table.Cell>
                    <Table.Cell>
                      {showPermissionChange && log.newPermissions.length > 0
                        ? log.newPermissions.map((p) => PERMISSION_LABELS[p] || p).join(", ")
                        : "—"}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Root>

          <div className="flex justify-center gap-4 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <Text className="self-center font-medium text-gray-800">
              Page <span className="font-bold">{currentPage}</span> of{" "}
              <span className="font-bold">{totalPages}</span>
            </Text>

            <button
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
