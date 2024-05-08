import { AppShell } from '@mantine/core'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import Footer from '../Footer'
import { getRole } from '../../configuration/RoleConfig'
import { UserNavbar } from '../users/UserNavbar'

const Layout = () => {
    // const isAdmin = getRole();
    const data = localStorage.getItem("user");
    const user = data ? JSON.parse(data) : '';
    const isAdmin = user.role;
    return (
        <>
            <AppShell>
                <AppShell.Header>
                    {isAdmin ? <Navbar /> : <UserNavbar />}
                </AppShell.Header>
                <AppShell.Main className='mb-28 mt-20'>
                    <Outlet />
                </AppShell.Main>
                <AppShell>
                    <AppShell.Footer>
                        <Footer />
                    </AppShell.Footer>
                </AppShell>
            </AppShell>
        </>
    )
}

export default Layout
