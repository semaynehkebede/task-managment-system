import { getUserId } from './RoleConfig';
const baseUrl = 'https://task-management-opll.onrender.com';
const userId = getUserId();
const endPoint = {
    login: "/api/auth/login",
    changePassword: "/api/auth/change-password",
    getProject: `/api/projects/get-projects`,
    getProjectById: "/api/projects/get-project/",
    createProject: '/api/projects/create-project',
    updateProject: '/api/projects/update-project',
    deleteProject: '/api/projects/delete-project/',
    archiveProject: '/api/projects/archive-project',
    getArchiveProject: '/api/projects/get-archived-projects',
    restoreArchiveProject: '/api/projects/restore-project/${id}',
    getCollectionTask: '/api/tasks/get-tasks?top=10&skip=10&includes[0]=assignee&includes[1]=project',
    getGroupedProject: 'api/projects/get-projects?includes[0]=tasks&includes[1]=tasks.assignee&search=service',



    getTaskList: '/api/tasks/get-tasks',
    // getTaskList: '/api/tasks/get-tasks?top=100&skip=1&includes[0]=assignee&includes[1]=project',
    getUserTaskList: `/api/tasks/get-user-tasks/{userId}?userId=${userId}`,
    getUserList: "api/users/get-users",
    getUserById: "/api/users/get-user/",
    getTaskByProjectId: "/api/tasks/get-project-tasks/{userId}?projectId=",
    createUser: "/api/users/create-user",
    createTask: "/api/tasks/create-task",
    updateTask: "/api/tasks/update-task",
    deleteTask: "/api/tasks/delete-task/",
    archiveTask: "/api/tasks/archive-task",


    // post: axios.post,/projects/get-projects/${id}`
    // put: axios.put,
    // delete: axios.delete,
};
export default endPoint;