import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const LIMIT_PAGE = Number(import.meta.env.VITE_LIMIT_PAGE);

export const getCourses = async (page: number) => {
    try {
        const response = await axios.get(
        `${API_URL}/admin/courses/all?page=${page}&limit=${LIMIT_PAGE}`,
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
        );
        return response.data;
    } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
    }
};

export const getCourseMembers = async (courseId: string, page: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/courses/${courseId}/users?page=${page}&limit=${LIMIT_PAGE}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching course members:", error);
    throw error;
  }
};


export const updateCourseMembers = async (
  courseId: string,
  members: {
    user: { id: number };
    userRole: string;
    permissions: string[];
  }[]
) => {
  try {
    const changes = members.map((m) => ({
      courseId,
      userId: m.user.id,
      newRole: m.userRole,
      newPermissions: m.permissions,
    }));

    const response = await axios.put(
      `${API_URL}/admin/courses/roles`,
      changes,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating course members:", error);
    throw error;
  }
};



export const getCourseAuditLogs = async (courseId: string, page: number, limit: number) => {
  try {
    const response = await axios.get(
      `${API_URL}/admin/audit`,
      {
        params: { courseId, page, limit },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching audit logs:", error);
    throw error;
  }
};