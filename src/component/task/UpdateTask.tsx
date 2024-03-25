import { ITaskUpdateInput, updateTaskProps } from './TaskType'
import { Button, Checkbox, MultiSelect, Paper, Stack, TextInput, Textarea } from '@mantine/core';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getProjectListAction } from '../../reduxToolkit/ProjectSlice';
import { getUserListAction } from '../../reduxToolkit/UserSlice';
import { createTaskAction, updateTaskAction } from '../../reduxToolkit/TaskSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { ApiStatus, ITaskFormInput } from './TaskType';
import { toast } from 'react-toastify';
import Multiselect from 'multiselect-react-dropdown';
import { getRole } from '../../configuration/RoleConfig';
export const Tags = {
    progress: "In Progress",
    completed: "Completed",
    pouse: "Pause",
    started: "Started",
}
const schema = yup.object().shape({
    id: yup.string().required("ID is a required field"),
    title: yup.string().required("Title is a required field"),
    description: yup.string().required("Description is a required field"),
    projectId: yup.string().required("project is a required field"),
    assigneeId: yup.string().required("Holder is a required field"),
    priority: yup
        .string()
        .required("priority field is a required"),
    dueDate: yup
        .string()
        .required("Due Date field is a required field"),
    status: yup
        .string()
        .required("Status is a required field"),
    tags: yup.array()
        .of(yup.string()).nullable(),
});
const UpdateTask = (props: updateTaskProps) => {
    const isAdmin = getRole();
    const dispatch = useAppDispatch();
    const { updateTaskFormStatus } = useSelector((state: any) => state.taskList);
    const { IProject: { data, count }, projectStatus } = useSelector((state: any) => state.projectList);
    const { list: { data: userData, count: userCount }, listStatus } = useSelector((state: any) => state.userList);
    const { createTaskFormStatus } = useSelector((state: any) => state.taskList);
    const {
        register,
        handleSubmit, control,
        formState: { errors },
    } = useForm<ITaskUpdateInput>({ resolver: yupResolver(schema) });
    useEffect(() => {
        dispatch<any>(getUserListAction());
        dispatch<any>(getProjectListAction());
    }, []);
    const onSubmit = (taskData: ITaskUpdateInput) => {
        dispatch(updateTaskAction(taskData));
    };

    useEffect(() => {
        if (updateTaskFormStatus === ApiStatus.success) {
            toast.success('Task Updated Successfully');
            props.onClose(false)
        }
        else if (updateTaskFormStatus === ApiStatus.error) {
            toast.success('Error Occured');
            // props.onClose(false)
        }
    }, [updateTaskFormStatus])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    <TextInput {...register('id')} label="ID" defaultValue={props.selectedItem.id} className='hidden' />
                    {errors.id && <p className='text-red-500'>{errors.id.message}</p>}
                    {isAdmin && (
                        <>
                            <TextInput {...register('title')} type="text" label="Title" placeholder="Type Title" defaultValue={props.selectedItem.title} />
                            {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <Textarea {...register('description')} label="Description" placeholder="Type Description" defaultValue={props.selectedItem.description} />
                            {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <select {...register('projectId')} defaultValue={props.selectedItem.projectId}>
                                <option value="">On Project</option>
                                {data?.map((projectList: any, index: any) => (
                                    <option key={index} value={projectList.id}>
                                        {projectList.title}
                                    </option>
                                ))}
                            </select>
                            {errors.projectId && <p className='text-red-500'>{errors.projectId.message}</p>}
                        </>
                    )}

                    {isAdmin && (
                        <>
                            <TextInput {...register('priority')} type="text" label="Priorrity" placeholder="Priorrity" defaultValue={props.selectedItem.priority} />
                            {errors.priority && <p className='text-red-500'>{errors.priority.message}</p>}
                        </>
                    )}
                    {isAdmin && (
                        <>
                            <TextInput {...register('dueDate')} type="date" label="Due Date" placeholder="Due Date" defaultValue={props.selectedItem.dueDate} />
                            {errors.dueDate && <p className='text-red-500'>{errors.dueDate.message}</p>}
                        </>
                    )}
                    <TextInput {...register('status')} type="text" label="Status" placeholder="Status" defaultValue={props.selectedItem.status ? props.selectedItem.status : "In Active"} />
                    {errors.status && <p className='text-red-500'>{errors.status.message}</p>}

                    {isAdmin && (
                        <>
                            <select {...register('assigneeId')} defaultValue={props.selectedItem.assigneeId}>
                                <option value="">Assign To</option>
                                {userData?.map((userList: any, index: any) => (
                                    <option key={index} value={userList.id}>
                                        {userList.name}
                                    </option>
                                ))}
                            </select>
                            {errors.assigneeId && <p className='text-red-500'>{errors.assigneeId.message}</p>}
                        </>
                    )}
                    <h2>Tags</h2>
                    <Checkbox
                        type="checkbox"
                        label="Completed"
                        value="completed"
                        {...register("tags", {
                            required: "Please select at-least one skill"
                        })}
                    />
                    <Checkbox
                        type="checkbox"
                        label="Progress"
                        value="progress"
                        {...register("tags")}
                    />
                    <Checkbox
                        type="checkbox"
                        label="Poused"
                        value="poused"
                        {...register("tags")}
                    />
                    <Checkbox
                        type="checkbox"
                        label="Starting"
                        value="starting"
                        {...register("tags")}
                    />
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Update
                </Button>
            </Paper>
        </form>
    )
}

export default UpdateTask
