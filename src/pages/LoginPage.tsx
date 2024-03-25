import React from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button, Paper, PasswordInput, Stack, TextInput } from '@mantine/core';
import { loginUser, setUser } from '../reduxToolkit/auth/LoginSlice';
import { AppDispatch, RootState } from '../reduxToolkit/Store';
import { useAppDispatch } from '../hooks/Hooks';
import { setCredentials } from '../reduxToolkit/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { getRole } from '../configuration/RoleConfig';
interface IFormInput {
    email: string;
    password: string;
}
// yup schema
const schema = yup.object().shape({
    password: yup.string().required("Password is a required field"),
    email: yup
        .string()
        .required("Email is a required field")
        .matches(
            /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
            "Invalid Email format"
        ),
});
const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormInput>({ resolver: yupResolver(schema) });
    const onSubmit = (data: IFormInput) => {
        dispatch(loginUser(data)).then((result) => {
            if (result.payload) {
                dispatch(setUser(result.payload))
                const isAdmin = getRole();
                console.log("Login", isAdmin);
                {
                    isAdmin ? navigate("/admin") : navigate("/user");
                }
            }
        })
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Paper p={30} mt={3} radius="md">
                <Stack>
                    <TextInput {...register('email')} type="text" label="Email  Address" placeholder="Your Email" />
                    {errors.email && <p className='text-red-900'>{errors.email.message}</p>}
                    <PasswordInput
                        type='password'
                        label="Password"
                        placeholder="Your password"
                        {...register('password')}
                    />
                    {errors.password && <p className='text-red-900'>{errors.password.message}</p>}
                </Stack>
                <Button fullWidth mt="xl" type="submit">
                    Login
                </Button>
            </Paper>
        </form>
    )
}

export default LoginPage
