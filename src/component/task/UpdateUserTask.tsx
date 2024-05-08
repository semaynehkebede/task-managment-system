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

// const schema = yup.object().shape({
//     id: yup.string().required("ID is a required field"),
//     title: yup.string().nullable().required("Title is a required field"),
//     description: yup.string().nullable().required("Description is a required field"),
//     projectId: yup.string().nullable().required("project is a required field"),
//     assigneeId: yup.string().nullable().required("project is a required field"),
//     priority: yup
//         .string().nullable()
//         .required("priority field is a required"),
//     dueDate: yup
//         .string().nullable()
//         .required("Due Date field is a required field"),
//     status: yup
//         .string()
//         .required("Status is a required field"),
// });
const UpdateUserTask = (props: updateTaskProps) => {
    const dispatch = useAppDispatch();
    const { updateTaskFormStatus } = useSelector((state: any) => state.taskList);
    const { IProject: { data, count }, projectStatus } = useSelector((state: any) => state.projectList);
    const { list: { data: userData, count: userCount }, listStatus } = useSelector((state: any) => state.userList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ITaskUpdateInput>(
            // { resolver: yupResolver(schema) }
        );
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
                    <TextInput className='hidden' {...register('id')} type="text" label="ID" placeholder="Type ID" defaultValue={props.selectedItem.id} />
                    <select
                        {...register('status')} defaultValue={props.selectedItem.status}>
                        <option value="">Select Status</option>
                        <option value="backlog">Backlog</option>
                        <option value="inqueue">In Queue</option>
                        <option value="inprogress">In Progress</option>
                        <option value="onhold">On Hold</option>
                        <option value="completed">Completed</option>
                    </select>
                    {errors.status && <p className='text-red-500'>{errors.status.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Update
                </Button>
            </Paper>
        </form>
    )
}

export default UpdateUserTask
