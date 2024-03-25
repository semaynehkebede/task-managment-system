import { Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../reduxToolkit/auth/LoginSlice';

const links = [
    { link: 'dashboard', label: 'Dashboard' },
    { link: 'task', label: 'Task' },
    { link: 'profile', label: 'User Profile' },
    { link: '/about', label: 'About' },
];
export function UserNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        // dispatch(setUser(null))
        dispatch(logOut());
        navigate('/login');
    }
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        return (

            <NavLink key={link.label} className='block leading-4 p-3 m-2 text-base rounded-sm no-underline text-gray-700 dark:text-dark-100 text-sm font-medium hover:bg-gray-100 dark:hover:bg-dark-600'
                to={link.link}>
                {link.label}
            </NavLink>

        );
    });

    return (
        <header className='bg-body border-b-1 border-gray-300 dark:border-dark-400 h-16 shadow-md w-full'>
            <Container size="md">
                <div className='h-14 flex justify-between items-center'>
                    {/* <MantineLogo size={28} /> */}
                    <Group gap={5} visibleFrom="sm">
                        {items}
                    </Group>
                    <Group gap={5} visibleFrom="sm" className='flex justify-end'>
                        <Button onClick={handleLogout} className='flex justify-end' variant="filled">Logout</Button>
                    </Group>
                    <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
                </div>
            </Container>
        </header>
    );
}