import { Button, Modal, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/Hooks';
import { deleteProjectAction, getProjectListAction } from '../../reduxToolkit/ProjectSlice';
import { useSelector } from 'react-redux';
import CreateProject from './CreateProject';
import ArchiveTask from './ArchiveTask';
import UpdateProject from './UpdateProject';
import { ApiStatus, projectResponce } from './ProjectType';
import { toast } from 'react-toastify';

const ProjectList = () => {
    const [OpenCreateModal, setOpenCreateModal] = useState(false);
    const [openProjectUpdateModal, setOpenProjectUpdateModal] = useState(false);
    const [openProjectArchiveModal, setOpenProjectArchiveModal] = useState(false);
    const [OpenDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>();
    const { IProject: { data, count }, projectStatus, deleteProjectStatus } = useSelector((state: any) => state.projectList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getProjectListAction());
    }, []);
    const onSubmitDelete = async (selectedData: any) => {
        dispatch(deleteProjectAction(selectedData.id))
    }
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    useEffect(() => {
        if (deleteProjectStatus === ApiStatus.success) {
            toast.success('Project Deleted Successfully');
            setOpenDeleteModal(false);
        }
    }, [deleteProjectStatus])
    const projectLists = data?.map((project: projectResponce, index: number) => (
        <Table.Tr key={project.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <Table.Td className='px-6 py-4'>{index + 1}</Table.Td>
            <Table.Td className='px-6 py-4'>{project.title}</Table.Td>
            <Table.Td className='px-6 py-4'>{project.description}</Table.Td>
            <Table.Td className='px-6 py-4'>{project.isActive ? "Active" : "In Active"}</Table.Td>
            <Table.Td className='px-6 py-4'>{formatDate(project.createdAt)}</Table.Td>
            <Table.Td className='px-6 py-4'>
                <NavLink to={`${project.id}`}>
                    <a onClick={() => {
                    }} className="font-medium text-green-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer">
                        Task{project.isActive}
                    </a>
                </NavLink>
                <NavLink to={''} onClick={() => {
                    setOpenProjectUpdateModal(true)
                    setSelectedData(project);
                }} className="font-medium text-blue-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer ml-2 mr-2 ">
                    Edit
                </NavLink>
                <NavLink to={''} onClick={() => {
                    setOpenProjectArchiveModal(true)
                    setSelectedData(project);
                }} className="font-medium text-yellow-600 dark:text-blue-500 hover:bg-amber-500 hover:text-white hover:cursor-pointer">
                    Archive
                </NavLink>
                <NavLink to={''} onClick={() => {
                    setOpenDeleteModal(true)
                    setSelectedData(project);
                }} className="font-medium text-red-600 dark:text-blue-500 hover:bg-red-700 hover:text-white ml-2 mr-2 hover:cursor-pointer">
                    Delete
                </NavLink>
            </Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            <div className='flex flex-col md:m-10'>
                <span className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-32 place-self-end'>
                    <NavLink onClick={() => {
                        setOpenCreateModal(true)
                        setSelectedData({});
                    }} to={''} >Add Project</NavLink>
                </span>
                <div className='overflow-x-auto'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <Table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <Table.Thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <Table.Tr>
                                    <Table.Th className='px-6 py-3'>No</Table.Th>
                                    <Table.Th className='px-6 py-3'>Title</Table.Th>
                                    <Table.Th className='px-6 py-3'>Description</Table.Th>
                                    <Table.Th className='px-6 py-3 '>Is Active</Table.Th>
                                    <Table.Th className='px-6 py-3 '>Created At</Table.Th>
                                    <Table.Th className='px-6 py-3'>Action</Table.Th>
                                </Table.Tr>
                            </Table.Thead>

                            {projectStatus === ApiStatus.loading && <tbody className="divide-y divide-gray-200">
                                Project List is loading</tbody>}
                            {projectStatus === ApiStatus.error && (
                                <tbody className="divide-y divide-gray-200">
                                    Error Occured</tbody>
                            )}
                            {projectStatus === ApiStatus.success &&
                                <Table.Tbody>{projectLists}</Table.Tbody>
                            }
                        </Table>
                    </div>
                </div>
            </div>

            <Modal opened={OpenCreateModal} onClose={() => {
                setOpenCreateModal(false)
                setSelectedData({});
            }} centered
                title="Create Task"
            >
                <CreateProject selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenCreateModal(isOpened)
                } />
            </Modal>
            <Modal opened={openProjectUpdateModal} onClose={() => {
                setOpenProjectUpdateModal(false)
                setSelectedData({});
            }} centered
                title="Update Task"
            >
                <UpdateProject selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenProjectUpdateModal(isOpened)
                } />
            </Modal>
            <Modal opened={openProjectArchiveModal} onClose={() => {
                setOpenProjectArchiveModal(false)
                setSelectedData({});
            }} centered
                title="Archive Project"
            >
                <ArchiveTask selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenProjectArchiveModal(isOpened)
                } />
            </Modal>
            <Modal opened={OpenDeleteModal} onClose={() => {
                setOpenDeleteModal(false)
                setSelectedData({});
            }} centered
                title="Delete Confirmation"
                size="sm">
                <Modal.Body>
                    <p>Are you sure you want to delete {selectedData?.title} Project</p>
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
    );


}

export default ProjectList
