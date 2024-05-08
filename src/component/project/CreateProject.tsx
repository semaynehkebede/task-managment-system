import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiStatus, IProjectFormInput } from './ProjectType';
import { createProjectAction } from '../../reduxToolkit/ProjectSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { stateStatus } from '../task/TaskType';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
type creatTaskProps = {
    selectedItem: any;
    onClose: (isOpened: boolean) => void;
}

const schema = yup.object().shape({
    title: yup.string().required("Title is a required field"),
    description: yup.string().required("Description is a required field"),
    isActive: yup.string().required("IsActive is a required field"),
});
const CreateProject = (props: creatTaskProps) => {
    const { IProject: { data, count }, createProjectFormStatus } = useSelector((state: any) => state.projectList);
    // const { createProjectFormStatus } = useSelector((state: any) => state.projectList);
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IProjectFormInput>({ resolver: yupResolver(schema) });
    const onSubmit = (projectData: IProjectFormInput) => {
        dispatch(createProjectAction(projectData));
        console.log(projectData);
    };
    useEffect(() => {
        if (createProjectFormStatus === ApiStatus.success) {
            toast.success('Project Created Successfully');
            props.onClose(false)
        }
        if (createProjectFormStatus === ApiStatus.error) {
            toast.success('Project Creation Faild');
            props.onClose(false)
        }
    }, [createProjectFormStatus])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    {createProjectFormStatus === stateStatus.failed && <h1>Not Created</h1>}
                    <TextInput {...register('title')} type="text" label="Title" placeholder="Type Title" />
                    {errors.title && <p className='text-red-500'>{errors.title.message}</p>}
                    <Textarea {...register('description')} label="Description" placeholder="Type Description" />
                    {errors.description && <p className='text-red-500'>{errors.description.message}</p>}
                    <select {...register('isActive')}>
                        <option value="">Is Active</option>
                        <option value="true">Active</option>
                        <option value="false">In Active</option>
                    </select></Stack>
                {errors.isActive && <p className='text-red-500'>{errors.isActive.message}</p>}
                <Button fullWidth mt="xl" type="submit">
                    Register
                </Button>
                {createProjectFormStatus === stateStatus.pending && <h1>Pending</h1>}
            </Paper>
        </form>
    )
}

export default CreateProject
