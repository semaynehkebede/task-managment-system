import { Button, Modal, Pagination, Table } from '@mantine/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getRole, getUserId } from '../../configuration/RoleConfig';
import CreateTask from './CreateTask';
import UpdateTask from './UpdateTask';
import ArchiveTask from './ArchiveTask';

const PTaskList = () => {

    const userId = getUserId();
    const isAdmin = getRole();
    // const logUserId = getUserId();
    // const dispatch = useAppDispatch();
    // const navigator = useNavigate();
    const [OpenCreateModal, setOpenCreateModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>();
    const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);
    const [openTaskArchiveModal, setOpenTaskArchiveModal] = useState(false);
    const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
    const onSubmitDelete = async (selectedData: any) => {
        alert(selectedData);
        // await deleteTask(selectedData.id);
        // refetch();
    }
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    const { collectionProjects } = useSelector((state: any) => state.collectionTask);
    console.log("Log in component", collectionProjects);
    const collectionTask = collectionProjects?.map((collectionProject: any, index: number) => (
        <Table.Tr key={collectionProject.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <Table.Td className='px-6 py-4'>{index + 1}</Table.Td>
            <Table.Td className='px-6 py-4'>{collectionProject.title}</Table.Td>
            <Table.Td className='px-6 py-4'>{collectionProject.description}</Table.Td>
            <Table.Td className='px-6 py-4'>{collectionProject.priority}</Table.Td>
            {isAdmin ?
                <Table.Td className='px-6 py-4'>{collectionProject?.assignee?.name}</Table.Td>
                : ''
            }
            <Table.Td className='px-6 py-4'>{collectionProject?.project?.title}</Table.Td>
            <Table.Td className='px-6 py-4'>{collectionProject.status}</Table.Td>
            <Table.Td className='px-6 py-4'>{collectionProject.dueDate}</Table.Td>
            <Table.Td className='px-6 py-4'>{collectionProject.tags?.join(' ,')}</Table.Td>
            {/* <Table.Td className='px-6 py-4'>{task.tags?.map((tag: any) => `${tag}, `)}</Table.Td> */}
            <Table.Td className='px-6 py-4'>{formatDate(collectionProject.createdAt)}</Table.Td>
            <Table.Td className='px-6 py-4'>
                <NavLink to={''} onClick={() => {
                    setOpenTaskUpdateModal(true)
                    setSelectedData(collectionProject);
                }} className="font-medium text-blue-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer ml-2 mr-2 ">
                    Edit
                </NavLink>
                {
                    isAdmin ?
                        <NavLink to={''} onClick={() => {
                            setOpenTaskArchiveModal(true)
                            setSelectedData(collectionProject);
                        }} className="font-medium text-yellow-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer">
                            Archive
                        </NavLink>
                        : ''
                }
                {
                    isAdmin ? <NavLink to={''} onClick={() => {
                        setOpenDeleteModal(true)
                        setSelectedData(collectionProject);
                    }} className="font-medium text-red-600 dark:text-blue-500 hover:bg-red-700 hover:text-white ml-2 mr-2 hover:cursor-pointer">
                        Delete
                    </NavLink>
                        : ''
                }
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <div className='flex flex-col md:m-10'>
                {
                    !isAdmin ?
                        <h2 className='text-black font-bold py-2 px-4 place-self-center'>
                            Tasks Assigned for {userId}
                        </h2>
                        : ''
                }
                {
                    isAdmin ?
                        <span className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-30 place-self-end'>
                            <NavLink to={''} onClick={() => {
                                setOpenCreateModal(true)
                                setSelectedData({});
                            }} >Add Task</NavLink>
                        </span>
                        : ''
                }
                <div className='overflow-x-auto'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <Table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <Table.Thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <Table.Tr>
                                    <Table.Th className='px-6 py-3'>NO</Table.Th>
                                    <Table.Th className='px-6 py-3'>Title</Table.Th>
                                    <Table.Th className='px-6 py-3'>Description</Table.Th>
                                    <Table.Th className='px-6 py-3'>Priority</Table.Th>
                                    {
                                        isAdmin ?
                                            <Table.Th className='px-6 py-3'>Assigned</Table.Th>
                                            : ''
                                    }
                                    <Table.Th className='px-6 py-3'>Project</Table.Th>
                                    <Table.Th className='px-6 py-3'>Status</Table.Th>
                                    <Table.Th className='px-6 py-3'>Due Date</Table.Th>
                                    <Table.Th className='px-6 py-3'>Tags</Table.Th>
                                    <Table.Th className='px-6 py-3'>Date Created</Table.Th>
                                    <Table.Th className='px-6 py-3'>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{collectionTask}</Table.Tbody>
                        </Table>
                    </div>
                </div>
                <div className=''>
                    <Pagination total={8} />
                </div>
            </div>

            <Modal opened={OpenCreateModal} onClose={() => {
                setOpenCreateModal(false)
                setSelectedData({});
            }} centered
                title="Create Task"
            >
                <CreateTask selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenCreateModal(isOpened)
                } />
            </Modal>
            <Modal opened={openTaskUpdateModal} onClose={() => {
                setOpenTaskUpdateModal(false)
                setSelectedData({});
            }} centered
                title="Update Task"
            >
                <UpdateTask selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenTaskUpdateModal(isOpened)
                } />
            </Modal>
            <Modal opened={openTaskArchiveModal} onClose={() => {
                setOpenTaskArchiveModal(false)
                setSelectedData({});
            }} centered
                title="Archive Task"
            >
                <ArchiveTask selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenTaskArchiveModal(isOpened)
                } />
            </Modal>
            <Modal opened={OpenDeleteModal} onClose={() => {
                setOpenDeleteModal(false)
                setSelectedData({});
            }} centered
                title="Delete Confirmation"
                size="sm">
                <Modal.Body>
                    <p>Are you sure you want to delete {selectedData?.title} Task</p>
                </Modal.Body>
                <div>
                    <Button className='mr-4' variant="light" onClick={() => setOpenDeleteModal(false)}>
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

export default PTaskList
