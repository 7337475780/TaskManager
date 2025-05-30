export const BASE_URL = "http://localhost:3001";

//apiPath.js
export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", //Register new user
    LOGIN: "/api/auth/login", //Authenticate user
    GET_PROFILE: "/api/auth/profile", //logged in user
  },
  USERS: {
    GET_ALL_USERS: "/api/users", //Get users
    GET_USER_BY_ID: (userId) => `/api/users/${userId}`, //Get through ID
    CREATE_USER: "/api/users", //Create new user
    UPDATE_USER: (userId) => `/api/users/${userId}`, //Update user
    DELETE_USER: (userId) => `/api/users/${userId}`, //Delete
  },
  TASKS: {
    GET_DASHBOARD_DATA: "/api/tasks/dashboard-data", //Get dashboard
    GET_USER_DASHBOARD_DATA: "/api/tasks/user-dashboard-data", //Get user dashboard
    GET_ALL_TASKS: "/api/tasks", //Get all
    GET_TASK_BY_ID: (taskId) => `/api/tasks/${taskId}`, //Get specific task
    CREATE_TASK: "/api/tasks/", //only Admin
    UPDATE_TASK: (taskId) => `/api/tasks/${taskId}`, //Update task
    DELETE_TASK: (taskId) => `/api/tasks/${taskId}`, //Delete task

    UPDATE_TASK_STATUS: (taskId) => `/api/tasks/${taskId}/status`, //Update status
    UPDATE_TODO_CHECKLIST: (taskId) => `/api/tasks/${taskId}/todo`,
  },

  REPORTS: {
    EXPORT_TASKS: "/api/reports/export/tasks", //Export all tasks
    EXPORT_USERS: "/api/reports/export/users", //Export all users
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-img", //Upload img
  },
};
