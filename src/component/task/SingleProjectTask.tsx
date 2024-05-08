import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Table } from '@mantine/core';
import { useAppDispatch } from '../../hooks/Hooks';
import { getTaskByProjectIdAction } from '../../reduxToolkit/TaskSlice';
import { useSelector } from 'react-redux';
import { getProjectByIdAction } from '../../reduxToolkit/ProjectSlice';

const SingleProjectTask = () => {
    const { id } = useParams();
    const { IProject, projectStatus } = useSelector((state: any) => state.projectList);
    // console.log("sptasss out of fun", IProject.data);
    const projects = IProject?.data?.find((project: any) => project.id === id);
    console.log(projects.id, id);
    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };
    // const getProject = (projectId: string) => {
    //     dispatch(getProjectByIdAction(projectId));
    //     console.log("sptasss infunction", IProject.data.title);
    //     return IProject.data.title;
    // };
    const dispatch = useAppDispatch();
    const [userId, setUserID] = useState<any>();
    const { task, taskStatus } = useSelector((state: any) => state.taskList);
    const taskList = task?.data?.map((task: any, index: number) => (
        <Table.Tr key={task.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <Table.Td className='px-6 py-4'>{index + 1}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.title}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.description}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.priority}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.assignee}</Table.Td>
            <Table.Td className='px-6 py-4'>{projects.title}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.status}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.dueDate}</Table.Td>
            <Table.Td className='px-6 py-4'>{task.tags}</Table.Td>
            <Table.Td className='px-6 py-4'>{formatDate(task?.createdAt)}</Table.Td>
        </Table.Tr>
    ));
    useEffect(() => {
        if (id)
            dispatch(getTaskByProjectIdAction(id))

    }, [id])
    return (
        <>
            <div className='flex flex-col md:m-10'>
                <div className='overflow-x-auto'>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <Table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                            <Table.Thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                <Table.Tr>
                                    <Table.Th className='px-6 py-3'>NO</Table.Th>
                                    <Table.Th className='px-6 py-3'>Title</Table.Th>
                                    <Table.Th className='px-6 py-3'>Description</Table.Th>
                                    <Table.Th className='px-6 py-3'>Priority</Table.Th>
                                    {/* <Table.Th className='px-6 py-3'>Assigned</Table.Th> */}
                                    <Table.Th className='px-6 py-3'>Project Id</Table.Th>
                                    <Table.Th className='px-6 py-3'>Status</Table.Th>
                                    <Table.Th className='px-6 py-3'>Due Date</Table.Th>
                                    <Table.Th className='px-6 py-3'>Tags</Table.Th>
                                    <Table.Th className='px-6 py-3'>Date Created</Table.Th>
                                    <Table.Th className='px-6 py-3'>Action</Table.Th>
                                    {/* {isAdmin ? <Table.Th className='px-6 py-3'>Actions</Table.Th>: '' } */}
                                </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{taskList}</Table.Tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleProjectTask
