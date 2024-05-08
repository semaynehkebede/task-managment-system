import { Button, Paper, Stack, TextInput } from '@mantine/core';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { ApiStatus, archiveInput } from './TaskType';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { archiveTaskAction } from '../../reduxToolkit/TaskSlice';
import { useAppDispatch } from '../../hooks/Hooks';


type archiveTaskProps = {
    selectedItem: any;
    onClose: (isOpened: boolean) => void;
}
const schema = yup.object().shape({
    id: yup.string().required("ID is a required field"),
    reason: yup.string().required("Archive Reason is a required field"),
});
const ArchiveTask = (props: archiveTaskProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<archiveInput>({ resolver: yupResolver(schema) });

    const { archiveStatus } = useSelector((state: any) => state.taskList);
    const dispatch = useAppDispatch();

    const onSubmit = (taskData: any) => {
        console.log(taskData)
        dispatch(archiveTaskAction(taskData));
    };
    useEffect(() => {
        if (archiveStatus === ApiStatus.success) {
            toast.success('Task Archived Successfully');
            props.onClose(false)
        }
        if (archiveStatus === ApiStatus.error) {
            toast.error('Some Thing Error');
        }
    }, [archiveStatus])
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    <TextInput className='hidden' {...register('id')} type="text" label="ID" placeholder="Type ID" defaultValue={props.selectedItem.id} />
                    <TextInput {...register('reason')} type="text" label="Archive Reason" placeholder="Type Archive Reason" />
                    {errors.reason && <p className='text-red-500'>{errors.reason.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Archive
                </Button>
            </Paper>
        </form>
    )
}

export default ArchiveTask
