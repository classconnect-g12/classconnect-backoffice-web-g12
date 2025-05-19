import { ClockIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { Table, Tooltip } from "@radix-ui/themes";

type Course = {
  id: string;
  title: string;
  description: string;
  capacity: number;
  startDate: string;
  endDate: string;
  correlatives: { id: string; title: string }[];
};

type CourseTableProps = {
  courses: Course[];
  onViewMembers: (courseId: string, courseName: string) => void;
  onViewLogs: (courseId: string, courseName: string) => void; 
};

export function CourseTable({ courses, onViewMembers, onViewLogs }: CourseTableProps) {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Capacity</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Start Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>End Date</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Correlatives</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Actions</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {courses.length === 0 ? (
          <Table.Row>
            <Table.Cell colSpan={8} className="text-center">
              No courses found.
            </Table.Cell>
          </Table.Row>
        ) : (
          courses.map((course) => (
            <Table.Row key={course.id}>
              <Table.RowHeaderCell>{course.id}</Table.RowHeaderCell>
              <Table.Cell>{course.title}</Table.Cell>
              <Table.Cell>{course.description}</Table.Cell>
              <Table.Cell>{course.capacity}</Table.Cell>
              <Table.Cell>
                {new Date(course.startDate).toLocaleDateString("en-CA")}
              </Table.Cell>
              <Table.Cell>
                {new Date(course.endDate).toLocaleDateString("en-CA")}
              </Table.Cell>
              <Table.Cell>
                {course.correlatives.length > 0
                  ? course.correlatives.map((c) => c.title).join(", ")
                  : "—"}
              </Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-2">
                  <Tooltip content="View Members">
                    <EyeOpenIcon
                      className="w-6 h-6 p-1 border text-blue-500 rounded cursor-pointer hover:border-blue-700 hover:text-blue-700 transition"
                      onClick={() => onViewMembers(course.id, course.title)}
                    />
                  </Tooltip>
                  <Tooltip content="View Logs">
                    <ClockIcon
                      className="w-6 h-6 p-1 border text-gray-500 rounded cursor-pointer hover:border-gray-700 hover:text-gray-700 transition"
                      onClick={() => onViewLogs(course.id, course.title)}
                    />
                  </Tooltip>
                </div>
              </Table.Cell>
            </Table.Row>
          ))
        )}
      </Table.Body>
    </Table.Root>
  );
}
