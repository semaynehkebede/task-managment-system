import axios from 'axios'
import React from 'react'
import { api } from '../../configuration/AxiosConfig';
import { useSelector } from 'react-redux';
import { Table } from '@mantine/core';
import { NavLink } from 'react-router-dom';

const GroupedProject = () => {
    const { GroupedProjects } = useSelector((state: any) => state.groupProject);
    console.log(GroupedProjects);
    const th =
        <Table.Tr>
            <Table.Th>Projects</Table.Th>
            <Table.Th>Tasks</Table.Th>
        </Table.Tr>
    const taskHeader = <Table.Tr>
        <Table.Th></Table.Th>
    </Table.Tr>
    const GroupedPro = GroupedProjects?.map((GroupedProject: any, index: number) => (
        <Table.Tr>
            <Table.Td>{GroupedProject.title}</Table.Td>
            <Table.Td>
                <Table>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Completed</Table.Th>
                            <Table.Th>Ongoing</Table.Th>
                            <Table.Th>Start</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {
                            GroupedProject?.tasks?.map((task: any) => {
                                return <Table.Tr key={task.id}>
                                    <Table.Td>{task.title}</Table.Td>
                                    <Table.Td>a</Table.Td>
                                    <Table.Td>c</Table.Td>
                                </Table.Tr>
                            })
                        }
                    </Table.Tbody>
                </Table>
            </Table.Td>
        </Table.Tr>
    ));
    return (
        <>
            <Table>
                <Table.Thead>{th}</Table.Thead>
                <Table.Tbody>{GroupedPro}</Table.Tbody>
            </Table>
        </>
    )
}

export default GroupedProject
