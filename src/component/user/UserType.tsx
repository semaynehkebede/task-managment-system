export type IUserFormInput = {
    name: string
    email: string
    phoneNumber: string
    gender: string
    jobTitle: string
    password: string
}
export type userListModel = {
    name: string
    email: string
    phoneNumber: string
    gender: string
    jobTitle: string
    isAdmin: string;
    isActive: string;
}
export interface updateProps {
    name: "",
    email: "",
    phoneNumber: "",
    gender: "",
    jobTitle: "",
    password: "",
    isActive: ""
}
export interface updateUserProps {
    selectedItem: updateProps;
    onClose: (isOpened: boolean) => void;
}
export enum stateStatus {
    "loading",
    "ideal",
    "success",
    "error",
}
export interface IUserState {
    list: userListModel[];
    listStatus: stateStatus;
    createUserFormStatus: stateStatus;
    updateUserFormStatus: stateStatus;
}