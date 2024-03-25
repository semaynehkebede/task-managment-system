import { Burger, Button, Container, Group } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import { NavLink, useNavigate } from 'react-router-dom';
import React from 'react'

const Header = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const handleLogout = () => {
        // dispatch(logout());
        // navigate('/login');
    }
    return (
        <header className='h-16 shadow-md w-full'>
            <Container className='h-16 flex justify-between items-center text-lg w-full py-4 md:px-10 px-7 w-full' >
                {/* <div className='h-16 flex justify-between items-center text-lg w-full py-4 md:px-10 px-7 w-full' > */}
                <h1 className='md:text-xl font-bold'>Task Management System</h1>
                {/* <Group gap={5} visibleFrom="xs" className='float-end'>
                    {items}
                </Group> */}
                {/* <Container className='flex items-center justify-between py-4 md:px-10 px-7 w-full '> */}
                <NavLink to='/'><Button className='flex justify-end' variant="filled" onClick={handleLogout}>Logout</Button></NavLink>
                {/* <NavLink to='/' className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static [&.active]:text-red-500 [&.active]:text-lg'>Login</NavLink> */}
                {/* </Container> */}

                <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
                {/* </div> */}
            </Container>
        </header>
    )
}

export default Header
