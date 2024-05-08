import { Menu, Group, Center, Burger, Container, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logOut } from '../../reduxToolkit/auth/LoginSlice';
import { useAppDispatch } from '../../hooks/Hooks';

const links = [
    { link: 'dashboard', label: 'Dashboard' },
    // { link: 'grouped/project', label: 'Gruoped' },

    {
        link: '#1',
        label: 'Project',
        links: [
            { link: 'project', label: 'List' },
            { link: 'project/collection', label: 'Collection Data' },
            // { link: 'project/archived', label: 'Archived' },
        ],
    },
    {
        link: '#1',
        label: 'Task',
        links: [
            { link: 'task', label: 'List' },
            // { link: 'task/p-list', label: 'PTask' },
            { link: 'task/archived', label: 'Archived' },
        ],
    },
    {
        link: '#2',
        label: 'User',
        links: [
            { link: 'user', label: 'List' },
            // { link: 'user/archived', label: 'Archived' },
        ],
    },
    // { link: '/about', label: 'About' },
];
export function Navbar() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user");
        dispatch(logOut());
        navigate('/login');
    }
    const [opened, { toggle }] = useDisclosure(false);

    const items = links.map((link) => {
        const menuItems = link.links?.map((item) => (
            <Menu.Item key={item.link} className=''
            >
                <NavLink to={item.link}>
                    {item.label}
                </NavLink>
            </Menu.Item>
        ));

        if (menuItems) {
            return (
                <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
                    <Menu.Target>
                        <a
                            href={link.link}
                            className='block leading-4 p-2 rounded-sm no-underline text-gray-700 dark:text-dark-100 text-sm font-medium hover:bg-gray-100 dark:hover:bg-dark-600'
                            onClick={(event) => event.preventDefault()}
                        >
                            <Center>
                                <span className='mr-5'>{link.label}</span>
                                <IconChevronDown size="0.9rem" stroke={1.5}></IconChevronDown>
                            </Center>
                        </a>
                    </Menu.Target>
                    <Menu.Dropdown>{menuItems}</Menu.Dropdown>
                </Menu>
            );
        }

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