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
    id: string
    title: string,
    projectId: string,
    description: string,
    status: string,
    assigneeId: string,
    // tags?: string[] | null;
    tags?: (string | undefined)[] | null;
    priority: string,
    dueDate: string,
}
export type taskResponce = {
    id: string,
    title: string,
    description: string,
    status: string,
    assigneeId: string,
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
