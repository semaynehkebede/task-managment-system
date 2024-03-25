import { Button, Paper, PasswordInput, Stack, TextInput, Textarea } from '@mantine/core';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { IUserFormInput, stateStatus } from './UserType';
import { createUserAction } from '../../reduxToolkit/UserSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type createUserProps = {
    selectedItem: any;
    onClose: (isOpened: boolean) => void;
}
// const schema = yup.object().shape({
//     name: yup.string().required("Name is a required field"),
//     email: yup
//         .string()
//         .required("Email is a required field")
//         .matches(
//             /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//             "Invalid Email format"
//         ),
//     phoneNumber: yup
//         .string()
//         .required("Phone Number is a required field")
//         .matches(
//             /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{3}$/,
//             "Invalid phone number format"
//         ),
//     gender: yup
//         .string()
//         .required("Gender field is a required"),
//     jobTitle: yup
//         .string()
//         .required("Job Title field is a required field"),
//     password: yup
//         .string()
//         .required("password is a required field"),
// });
const CreateUser = (props: createUserProps) => {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserFormInput>(
            // { resolver: yupResolver(schema) }
        );
    const { createUserFormStatus } = useSelector((state: any) => state.userList);
    const onSubmit = (userData: IUserFormInput) => {
        // console.log(userData);
        dispatch(createUserAction(userData));
    };
    useEffect(() => {
        if (createUserFormStatus === stateStatus.success) {
            toast.success('User Created Successfully');
            props.onClose(false)
        }
    }, [createUserFormStatus])
    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    <TextInput {...register('name')} type="text" label="Name" placeholder="Enter Name" />
                    {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
                    <TextInput {...register('email')} type="text" label="Email Address" placeholder="Your Email" />
                    {errors.email && <p className='text-red-900'>{errors.email.message}</p>}
                    <PasswordInput
                        type='password'
                        label="Password"
                        placeholder="Enter password"
                        {...register('password')}
                    />
                    <TextInput {...register('phoneNumber')} type="text" label="Phone Number" placeholder="Enter Phone Number" />
                    {errors.phoneNumber && <p className='text-red-500'>{errors.phoneNumber.message}</p>}
                    <select {...register('gender')}>
                        <option value="">Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {errors.gender && <p className='text-red-500'>{errors.gender.message}</p>}
                    <TextInput {...register('jobTitle')} type="text" label="Job Title" placeholder="Enter Job Title" />
                    {errors.jobTitle && <p className='text-red-500'>{errors.jobTitle.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Register
                </Button>
            </Paper>
        </form>
    )
}

export default CreateUser
