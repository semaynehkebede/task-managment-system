import { Button, Paper, Stack, TextInput, Textarea } from '@mantine/core'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProjectAction } from '../../reduxToolkit/ProjectSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { changePassword } from '../../reduxToolkit/auth/LoginSlice';
export type passwordData = {
    // id: "123",
    password: string,
    confirmPassword: string,
    currentPassword: string,
};
export type changeDataProps = {
    selectedItem: any;
    onClose: (isOpened: boolean) => void;
}
const schema = yup.object().shape({
    // id: yup.string().required("ID is a required field"),
    currentPassword: yup.string().required("Current Password is a required field"),
    password: yup.string().required("Password is a required field"),
    confirmPassword: yup.string().required("Confirm Password is a required field")
        .test('password-should-match', 'Passwords must match', function (value) {
            return this.parent.password === value
        })
});
const ChangePassword = (props: changeDataProps) => {
    const dispatch = useAppDispatch();
    const { updateProjectFormStatus } = useSelector((state: any) => state.projectList);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<passwordData>({ resolver: yupResolver(schema) });
    const onSubmit = (updatedData: passwordData) => {
        dispatch(changePassword(updatedData));
    };
    // useEffect(() => {
    //     if (updateProjectFormStatus === stateStatus.succeeded) {
    //         toast.success('Updated Successfully');
    //         props.onClose(false)
    //     }
    // }, [updateProjectFormStatus])
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    {/* {updateProjectFormStatus === stateStatus.failed && <h1>Not Updated</h1>} */}
                    <TextInput {...register('currentPassword')} type="password" label="current Password" placeholder="Type current Password" />
                    {errors.currentPassword && <p className='text-red-500'>{errors.currentPassword.message}</p>}
                    <TextInput {...register('password')} type="password" label="password" placeholder="password" />
                    {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    <TextInput {...register('confirmPassword')} type='password' label="confirm Password" placeholder="Type confirm Password" />
                    {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Change
                </Button>
                {/* {updateProjectFormStatus === stateStatus.pending && <h1>Pending</h1>} */}
            </Paper>
        </form>
    )
}

export default ChangePassword

