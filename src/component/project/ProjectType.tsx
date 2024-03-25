export type IProjectFormInput = {
    title: string;
    description: string,
    isActive: string,
}
export type projectResponce = {
    id: string;
    title: string;
    description: string,
    isActive: string,
    createdAt: string;
    deletedBy: string,
    archiveReason: string,
}
export type IProjectUpdateInput = {
    id: string;
    title: string;
    description: string,
    isActive: string,
}
export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error"
}
export interface IProjectState {
    list: projectResponce[],
    listStatus: ApiStatus
}
export type updateProjectProps = {
    selectedItem: any;
    onClose: (isOpened: boolean) => void;
}

export const stateStatus = {
    ideal: "ideal",
    pending: "pending",
    succeeded: "succeeded",
    failed: "failed",
}