import { ITaskUpdateInput, updateTaskProps } from './TaskType'
import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from 'react-redux';
import { updateTaskAction } from '../../reduxToolkit/TaskSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { ApiStatus } from './TaskType';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
    id: yup.string().required("ID is a required field"),
    title: yup.string().required("Title is a required field"),
    description: yup.string().required("Description is a required field"),
    projectId: yup.string().required("project is a required field"),
    assigneeId: yup.string().required("project is a required field"),
    priority: yup
        .string()
        .required("priority field is a required"),
    dueDate: yup
        .string()
        .required("Due Date field is a required field"),
    status: yup
        .string()
        .required("Status is a required field"),
});
const UpdateTask = (props: updateTaskProps) => {
    const dispatch = useAppDispatch();
    const { updateTaskFormStatus } = useSelector((state: any) => state.taskList);
    const { IProject: { data, count }, projectStatus } = useSelector((state: any) => state.projectList);
    const { list: { data: userData, count: userCount }, listStatus } = useSelector((state: any) => state.userList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITaskUpdateInput>({ resolver: yupResolver(schema) });
    const onSubmit = (taskData: ITaskUpdateInput) => {
        dispatch(updateTaskAction(taskData));
    };

    useEffect(() => {
        if (updateTaskFormStatus === ApiStatus.success) {
            toast.success('Task Updated Successfully');
            props.onClose(false)
        }
        else if (updateTaskFormStatus === ApiStatus.error) {
            toast.error('Error Occured');
        }
    }, [updateTaskFormStatus])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    <TextInput className='hidden' {...register('id')} type="text" label="ID" placeholder="Type ID" defaultValue={props.selectedItem.id} />
                    <TextInput {...register('title')} type="text" label="Title" placeholder="Type Title" defaultValue={props.selectedItem.title} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    <Textarea {...register('description')} label="Description" placeholder="Type Description" defaultValue={props.selectedItem.description} />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    <select {...register('projectId')} defaultValue={props.selectedItem.projectId}>
                        <option value="">On Project</option>
                        {data?.map((projectList: any, index: any) => (
                            <option key={index} value={projectList.id}>
                                {projectList.title}
                            </option>
                        ))}
                    </select>
                    {errors.projectId && <p className='text-red-500'>{errors.projectId.message}</p>}
                    <TextInput {...register('priority')} type="text" label="Priorrity" placeholder="Priorrity" defaultValue={props.selectedItem.priority} />
                    {errors.priority && <p className='text-red-500'>{errors.priority.message}</p>}

                    <TextInput {...register('dueDate')} type="date" label="Due Date" placeholder="Due Date" defaultValue={props.selectedItem.dueDate} />
                    {errors.dueDate && <p className='text-red-500'>{errors.dueDate.message}</p>}
                    <select
                        {...register('status')} defaultValue={props.selectedItem.status}>
                        <option value="">Select Status</option>
                        <option value="backlog">Backlog</option>
                        <option value="inqueue">In Queue</option>
                        <option value="inprogress">In Progress</option>
                        <option value="onhold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                    {/* <TextInput {...register('status')} type="text" label="Status" placeholder="Status" /> */}
                    {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
                    <select {...register('assigneeId')} defaultValue={props.selectedItem.assignee?.id}>
                        <option value="">Assign To</option>
                        {userData?.map((userList: any, index: any) => (
                            <option key={index} value={userList.id}>
                                {userList.name}
                            </option>
                        ))}
                    </select>
                    {errors.assigneeId && <p className='text-red-500'>{errors.assigneeId.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Update
                </Button>
            </Paper>
        </form>
    )
}

export default UpdateTask
