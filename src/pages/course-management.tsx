import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TabNavigation from "../components/TabNavigation";
import { TextField, Callout, Flex, Text } from "@radix-ui/themes";
import { MagnifyingGlassIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import { CourseTable } from "../components/CourseTable";
import { getCourses } from "../services/courseService";

type Course = {
  id: string;
  title: string;
  description: string;
  capacity: number;
  startDate: string;
  endDate: string;
  correlatives: { id: string; title: string }[];
};

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = isNaN(rawPage) || rawPage < 1 ? 1 : rawPage;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses(currentPage - 1);
        if (response && response.courses && response.pagination) {
          const { courses, pagination } = response;
          setCourses(courses);
          setTotalPages(pagination.totalPages);

          if (currentPage > pagination.totalPages && pagination.totalPages > 0) {
            setSearchParams({ page: String(pagination.totalPages) });
          }
          if (currentPage < 1) {
            setSearchParams({ page: "1" });
          }
        } else {
          setError("No courses found");
        }
      } catch (err) {
        setError("An error occurred while fetching courses.");
      }
    };

    fetchCourses();
  }, [currentPage, setSearchParams]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: String(currentPage - 1) });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: String(currentPage + 1) });
    }
  };

  const handleViewMembers = (courseId: string, courseName: string) => {
    navigate(`/course/${courseId}/members?name=${encodeURIComponent(courseName)}`);
  };

  const handleViewLogs = (courseId: string, courseName: string) => {
    navigate(`/course/${courseId}/logs?name=${encodeURIComponent(courseName)}`);
  };

  return (
    <div className="w-8/12 mx-auto">
      <TabNavigation activeTab="course-management" />

      <div className="flex justify-end mt-10">
        <TextField.Root placeholder="Search the Courses…" className="w-64">
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </div>

      {error && (
        <Callout.Root color="red">
          <Flex align="center" gap="2">
            <InfoCircledIcon />
            <Text color="red">{error}</Text>
          </Flex>
        </Callout.Root>
      )}

      <div className="mt-10">
        {}
        <CourseTable courses={courses ?? []} onViewMembers={handleViewMembers} onViewLogs={handleViewLogs}/>
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <button
          disabled={currentPage === 1}
          onClick={handlePrevPage}
          className="px-3 text-sm font-semibold rounded-lg bg-blue-500 text-white cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div>
          <p className="font-medium text-gray-800">
            Page <span className="font-bold">{currentPage}</span> of{" "}
            <span className="font-bold">{totalPages}</span>
          </p>
        </div>

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
