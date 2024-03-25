import { AppShell, Button, Container, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks';
import React from 'react'
import { NavLink } from 'react-router-dom'
import RootPage from './RootPage';
import Footer from './Footer';
import LoginPage from './LoginPage';

const MainPage = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <AppShell
                header={{ height: 60 }}
            >
                <AppShell.Header className='shadow-md w-full bg-green-300'>
                    <Container className='flex items-center justify-between py-4 md:px-10 px-7 w-full '>
                        <h1 className='w-full md:text-xl font-bold items-center'>Task Management System</h1>
                        <NavLink to='/'><Button variant="filled" onClick={open}>Login</Button></NavLink>
                        {/* <NavLink to='/' className='btn bg-blue-600 text-white md:ml-8 font-semibold px-3 py-1 rounded duration-500 md:static [&.active]:text-red-500 [&.active]:text-lg'>Login</NavLink> */}
                    </Container>
                    {/* <Burger
                        opened={opened}
                        // onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    /> */}
                </AppShell.Header>
                <AppShell.Main className='mb-28'>
                    <RootPage />
                </AppShell.Main>
                <AppShell>
                    <AppShell.Footer>
                        <Footer />
                    </AppShell.Footer>
                </AppShell>
            </AppShell>
            <Modal opened={opened} onClose={close} centered
                title="Login Page"
            >
                <LoginPage />
            </Modal>
        </>
    )
}

export default MainPage
