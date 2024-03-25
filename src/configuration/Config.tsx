import { getUserId } from './RoleConfig';
const baseUrl = 'https://task-management-opll.onrender.com';
const userId = getUserId();
const endPoint = {
    login: "/api/auth/login",
    getProject: `/api/projects/get-projects`,
    getProjectById: "/api/projects/get-project/",
    createProject: '/api/projects/create-project',
    updateProject: '/api/projects/update-project',
    deleteProject: '/api/projects/delete-project/${ id }',
    archiveProject: '/api/projects/archive-project',
    getArchiveProject: '/api/projects/get-archived-projects',
    restoreArchiveProject: '/api/projects/restore-project/${id}',






    getTaskList: `/api/tasks/get-tasks`,
    getUserTaskList: `/api/tasks/get-user-tasks/{userId}?userId=${userId}`,
    getUserList: "api/users/get-users",
    getUserById: "/api/users/get-user/",
    getTaskByProjectId: "/api/tasks/get-project-tasks/{userId}?projectId=",
    createUser: "/api/users/create-user",
    createTask: "/api/tasks/create-task",
    updateTask: "/api/tasks/update-task",
    // post: axios.post,/projects/get-projects/${id}`
    // put: axios.put,
    // delete: axios.delete,
};
export default endPoint;