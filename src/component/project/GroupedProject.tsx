import axios from 'axios'
import React from 'react'
import { api } from '../../configuration/AxiosConfig';
import { useSelector } from 'react-redux';
import { Table } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const GroupedProject = () => {
    const { groupedProjects } = useSelector((state: any) => state.groupProject);
    console.log(groupedProjects);
    const th =
        <Table.Tr>
            <Table.Th className='px-6 py-3'>Projects</Table.Th>
            <Table.Th className='px-6 py-3'>Tasks</Table.Th>
            <Table.Th className='px-6 py-3'>Project Status</Table.Th>
        </Table.Tr>
    const taskHeader = <Table.Tr>
        <Table.Th></Table.Th>
    </Table.Tr>
    const groupedPro = groupedProjects?.map((groupedProject: any, index: number) => (
        <Table.Tr key={groupedProject.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
            <Table.Td className='px-6 py-4'>{groupedProject.title}</Table.Td>
            <Table.Td>
                {groupedProject.tasks.length > 0 ? (
                    <Table>
                        {groupedProject.tasks[0] ? (
                            <Table.Thead>
                                <Table.Tr>
                                    <Table.Th>Title</Table.Th>
                                    <Table.Th>Assigned For</Table.Th>
                                    <Table.Th>Status</Table.Th>
                                </Table.Tr>
                            </Table.Thead>
                        ) : ''}
                        <Table.Tbody>
                            {
                                groupedProject?.tasks?.map((task: any) => {
                                    return (
                                        <Table.Tr key={task.id} className='odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700'>
                                            <Table.Td className='px-6 py-4'>{task.title}</Table.Td>
                                            <Table.Td className={`px-6 py-4 ${task?.assignee?.name ? 'bg-yellow' : 'bg-orange'
                                                }`} >{task?.assignee?.name ? task?.assignee?.name : "Not Assigned"}</Table.Td>
                                            <Table.Td className='px-6 py-4'><p>{task.status}</p><p>{task.dueDate ? task.dueDate : "Not Seeted"}</p></Table.Td>
                                        </Table.Tr>
                                    )
                                })
                            }
                        </Table.Tbody>
                    </Table>
                ) : (
                    <p>Task not Created on this project</p>
                )}

            </Table.Td>
            <Table.Td>{groupedProject.isActive ? "Active" : "In Active"}</Table.Td>
        </Table.Tr>
    ));
    return (
        <div className='flex flex-col md:m-10'>
            <div className='overflow-x-auto'>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <Table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                        <Table.Thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>{th}</Table.Thead>
                        <Table.Tbody>{groupedPro}</Table.Tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default GroupedProject
