import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiStatus, IProjectUpdateInput, stateStatus, updateProjectProps } from './ProjectType';
import { updateProjectAction } from '../../reduxToolkit/ProjectSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
const schema = yup.object().shape({
    id: yup.string().required("ID is a required field"),
    title: yup.string().required("Title is a required field"),
    description: yup.string().required("Description is a required field"),
    isActive: yup.string().required("IsActive is a required field"),
});
const UpdateProject = (props: updateProjectProps) => {
    const dispatch = useAppDispatch();

    const { updateProjectFormStatus } = useSelector((state: any) => state.projectList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProjectUpdateInput>({ resolver: yupResolver(schema) });
    const onSubmit = (updatedData: IProjectUpdateInput) => {
        dispatch(updateProjectAction(updatedData));
    };
    useEffect(() => {
        if (updateProjectFormStatus === stateStatus.succeeded) {
            toast.success('Updated Successfully');
            props.onClose(false)
        }
    }, [updateProjectFormStatus])
    // useEffect(() => {
    //     if (createProjectFormStatus === stateStatus.failed) {
    //         toast.success('User Created Successfully');
    //         props.onClose(false)
    //     }
    // }, [createProjectFormStatus])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    {updateProjectFormStatus === stateStatus.failed && <h1>Not Updated</h1>}
                    <TextInput {...register('id')} type="text" label="ID" placeholder="ID" className='hidden' defaultValue={props.selectedItem.id} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    <TextInput {...register('title')} type="text" label="Title" placeholder="Type Title" defaultValue={props.selectedItem.title} />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    <Textarea {...register('description')} label="Description" placeholder="Type Description" defaultValue={props.selectedItem.description} />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    <select {...register('isActive')} defaultValue={props.selectedItem.isActive}>
                        <option value="">Is Active</option>
                        <option value="true">Active</option>
                        <option value="false">In Active</option>
                    </select>
                    {errors.isActive && <p className='text-red-500'>{errors.isActive.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Update
                </Button>
                {updateProjectFormStatus === stateStatus.pending && <h1>Pending</h1>}
            </Paper>
        </form>
    )
}

export default UpdateProject
