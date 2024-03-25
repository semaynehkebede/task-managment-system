import { Button, Modal, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getUserListAction } from '../../reduxToolkit/UserSlice';
import { getRole } from '../../configuration/RoleConfig';
import { useAppDispatch } from '../../hooks/Hooks';
import CreateUser from './CreateUser';
import ArchiveUser from './ArchiveUser';
import UpdateUser from './UpdateUser';

const UserList = () => {
    const dispatch = useAppDispatch();
    const navigator = useNavigate();
    const [OpenCreateModal, setOpenCreateModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>();
    const [openUserUpdateModal, setOpenUserUpdateModal] = useState(false);
    const [openUserArchiveModal, setOpenUserArchiveModal] = useState(false);
    const [OpenDeleteUserModal, setOpenDeleteUserModal] = useState(false);

    const { list: { data, count }, listStatus } = useSelector((state: any) => state.userList);

    const onSubmitDelete = async (selectedData: any) => {
        // console.log(selectedData.id);
        alert(selectedData);
        // await deleteUser(selectedData.id);
        // refetch();
    }
    useEffect(() => {
        dispatch(getUserListAction());
    }, []);
    // console.log(data);
    const isAdmin = getRole();
    const userList = data?.map((user: any, index: number) => (
        <Table.Tr key={user.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <Table.Td className='px-6 py-4'>{index + 1}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.name}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.email}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.phoneNumber}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.gender}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.jobTitle}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.isAdmin ? "Admin" : "User"}</Table.Td>
            <Table.Td className='px-6 py-4'>{user.isActive ? "Active" : "In Active"}</Table.Td>
            <Table.Td className='px-6 py-4'>
                <a onClick={() => {
                    setOpenUserUpdateModal(true)
                    setSelectedData(user);
                }} className="font-medium text-blue-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer ml-2 mr-2 ">
                    Edit
                </a>
                <a onClick={() => {
                    setOpenUserArchiveModal(true)
                    setSelectedData(user);
                    // setSelectedData(data);
                }} className="font-medium text-yellow-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer">
                    Archive
                </a>
                {isAdmin ? <a onClick={() => {
                    setOpenDeleteUserModal(true)
                    setSelectedData(user);
                    // setSelectedData(data);
                }} className="font-medium text-red-600 dark:text-blue-500 hover:bg-red-700 hover:text-white ml-2 mr-2 hover:cursor-pointer">
                    Delete
                </a> : ''}
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <div className='flex flex-col md:m-10'>
                <span className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-32 place-self-end'>
                    <NavLink to={''} onClick={() => {
                        setOpenCreateModal(true)
                        setSelectedData({});
                        // setSelectedData(data);
                    }} >Add User</NavLink>
                </span>
                <div className='overflow-x-auto'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <Table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <Table.Thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <Table.Tr>
                                    <Table.Th className='px-6 py-3'>NO</Table.Th>
                                    <Table.Th className='px-6 py-3'>Name</Table.Th>
                                    <Table.Th className='px-6 py-3'>Email</Table.Th>
                                    <Table.Th className='px-6 py-3'>Phone Number</Table.Th>
                                    <Table.Th className='px-6 py-3'>Gender</Table.Th>
                                    <Table.Th className='px-6 py-3'>Job Title</Table.Th>
                                    <Table.Th className='px-6 py-3'>Role</Table.Th>
                                    <Table.Th className='px-6 py-3'>Status</Table.Th>
                                    <Table.Th className='px-6 py-3'>Action</Table.Th>
                                    {/* {isAdmin ? <Table.Th className='px-6 py-3'>Actions</Table.Th>: '' } */}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{userList}</Table.Tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <Modal opened={OpenCreateModal} onClose={() => {
                setOpenCreateModal(false)
                setSelectedData({});
            }} centered
                title="Create User"
            >
                <CreateUser selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenCreateModal(isOpened)
                } />
            </Modal>
            <Modal opened={openUserUpdateModal} onClose={() => {
                setOpenUserUpdateModal(false)
                setSelectedData({});
            }} centered
                title="Update User"
            >
                <UpdateUser selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenUserUpdateModal(isOpened)
                } />
            </Modal>
            <Modal opened={openUserArchiveModal} onClose={() => {
                setOpenUserArchiveModal(false)
                setSelectedData({});
            }} centered
                title="Archive User"
            >
                <ArchiveUser selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenUserArchiveModal(isOpened)
                } />
            </Modal>
            <Modal opened={OpenDeleteUserModal} onClose={() => {
                setOpenDeleteUserModal(false)
                setSelectedData({});
            }} centered
                title="Delete Confirmation"
                size="sm">
                <Modal.Body>
                    <p>Are you sure you want to delete {selectedData?.name} User</p>
                </Modal.Body>
                <div>
                    <Button className='mr-4' variant="light" onClick={() => setOpenDeleteUserModal(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="filled"
                        color="red"
                        onClick={() => onSubmitDelete(selectedData)}
                    >
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default UserList
