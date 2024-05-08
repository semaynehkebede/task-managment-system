export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error",
}
export interface ITaskState {
    task: taskResponce[];
    taskListStatus: ApiStatus;
    createTaskFormStatus: ApiStatus;
    updateTaskFormStatus: ApiStatus;
    deleteStatus: ApiStatus;
    archiveStatus: ApiStatus
}
export type ITaskFormInput = {
    title: string,
    projectId: string,
    description: string,
    status: string,
    assigneeId: string,
    // tags: [
    //     string
    // ],
    priority: string,
    dueDate: string,
}
export type ITaskUpdateInput = {
    id: string,
    title: string,
    projectId: string,
    description: string,
    status: string,
    assigneeId: string,
    tags?: (string | undefined)[] | null;
    priority: string,
    dueDate: string,
}
export type IUpdateUserTask = {
    id: string,
    status: string,
    tags: string
}
export type taskResponce = {
    id: string,
    title: string,
    description: string,
    status: string,
    project: {
        title: string,
        id: string,
    }
    assignee: {
        id: string,
        name: string,
    },
    tags: [
        string
    ],
    priority: string,
    dueDate: string,
    projectId: string,
    createdBy: string,
    updatedBy: string,
    createdAt: string,
    updatedAt: string,
    deletedAt: string,
    deletedBy: string,
    archiveReason: string
}
export const stateStatus = {
    ideal: "ideal",
    pending: "pending",
    succeeded: "succeeded",
    failed: "failed",
}
export interface updateTaskProps {
    selectedItem: taskResponce;
    onClose: (isOpened: boolean) => void;
}
export const TaskStatusLists = [
    { label: 'Backlog', value: 'backlog' },
    { label: 'In Queue', value: 'inqueue' },
    { label: 'In Progress', value: 'inProgress' },
    { label: 'On Hold', value: 'onHold' },
    { label: 'Completed', value: 'completed' },
];
export type archiveInput = {
    id: string,
    reason: string,
}

