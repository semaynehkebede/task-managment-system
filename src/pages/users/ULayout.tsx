import { AppShell } from '@mantine/core'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { getRole } from '../../configuration/RoleConfig'
import { UserNavbar } from '../users/UserNavbar'

const Layout = () => {
    const isAdmin = getRole();
    return (
        <>
            <AppShell>
                <AppShell.Header>
                    <UserNavbar />
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
