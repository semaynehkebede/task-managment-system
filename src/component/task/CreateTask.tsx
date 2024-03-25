import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { getProjectListAction } from '../../reduxToolkit/ProjectSlice';
import { getUserListAction } from '../../reduxToolkit/UserSlice';
import { createTaskAction } from '../../reduxToolkit/TaskSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { ApiStatus, ITaskFormInput } from './TaskType';
import { toast } from 'react-toastify';

type creatTaskProps = {
    selectedItem: any;
    onClose: (isOpened: boolean) => void;
}
const schema = yup.object().shape({
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
const CreateTask = (props: creatTaskProps) => {
    const dispatch = useAppDispatch();
    const { IProject: { data, count }, projectStatus } = useSelector((state: any) => state.projectList);
    const { list: { data: userData, count: userCount }, listStatus } = useSelector((state: any) => state.userList);
    const { createTaskFormStatus } = useSelector((state: any) => state.taskList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITaskFormInput>({ resolver: yupResolver(schema) });

    useEffect(() => {
        dispatch<any>(getUserListAction());
        dispatch<any>(getProjectListAction());
    }, []);
    const onSubmit = (taskData: ITaskFormInput) => {
        dispatch(createTaskAction(taskData));
        console.log(data);
    };

    useEffect(() => {
        if (createTaskFormStatus === ApiStatus.success) {
            toast.success('User Created Successfully');
            props.onClose(false)
        }
    }, [createTaskFormStatus])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    <TextInput {...register('title')} type="text" label="Title" placeholder="Type Title" />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    <Textarea {...register('description')} label="Description" placeholder="Type Description" />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    <select {...register('projectId')}>
                        <option value="">On Project</option>
                        {data?.map((projectList: any, index: any) => (
                            <option key={index} value={projectList.id}>
                                {projectList.title}
                            </option>
                        ))}
                    </select>
                    {errors.projectId && <p className='text-red-500'>{errors.projectId.message}</p>}
                    <TextInput {...register('priority')} type="text" label="Priorrity" placeholder="Priorrity" />
                    {errors.priority && <p className='text-red-500'>{errors.priority.message}</p>}

                    <TextInput {...register('dueDate')} type="date" label="Due Date" placeholder="Due Date" />
                    {errors.dueDate && <p className='text-red-500'>{errors.dueDate.message}</p>}
                    <TextInput {...register('status')} type="text" label="Status" placeholder="Status" />
                    {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
                    <select {...register('assigneeId')}>
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
                    Register
                </Button>
            </Paper>
        </form>
    )
}

export default CreateTask
