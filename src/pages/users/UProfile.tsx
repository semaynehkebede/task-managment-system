import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserByIdAction } from '../../reduxToolkit/UserSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { getUserId } from '../../configuration/RoleConfig';
import { NavLink } from 'react-router-dom';
import { Modal } from '@mantine/core';
import ChangePassword from '../../component/user/ChangePassword';

const UProfile = () => {
    const [OpenChangePasswordModal, setOpenChangePasswordModal] = useState(false);
    const [selectedData, setSelectedData] = useState<any>();
    const userId = getUserId();
    const dispatch = useAppDispatch();
    const { list, listStatus } = useSelector((state: any) => state.userList);
    console.log("In Upr", list);
    useEffect(() => {
        dispatch(getUserByIdAction(userId))
    }, []);
    // console.log(list);
    console.log("user prxsadsadso", list);
    return (
        <>
            <div className="flex justify-center h-screen">
                <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <div className='inline-flex'>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                {list.name} Profile
                            </h3>
                            {/* <NavLink to={''} onClick={() => {
                                setOpenChangePasswordModal(true)
                                setSelectedData(list);
                            }} className="hover:bg-amber-500 hover:text-white hover:cursor-pointer ml-2 mr-2 text-right">
                                Change Password
                            </NavLink> */}
                        </div>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Details and informations about {list.name}.
                        </p>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Full Name
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {list.name}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Phone Number
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {list.phoneNumber}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Email address
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {list.email}
                                </dd>
                            </div>
                            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Gende
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {list.gender}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Job Title
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {list.jobTitle}
                                </dd>
                            </div>
                            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">
                                    Role
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {list.isAdmin ? "Admin" : "User"}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            <Modal opened={OpenChangePasswordModal} onClose={() => {
                setOpenChangePasswordModal(false)
                setSelectedData({});
            }} centered
                title="Change Password User"
            >
                <ChangePassword selectedItem={selectedData} onClose={(isOpened: boolean) => setOpenChangePasswordModal(isOpened)
                } />
            </Modal>
        </>
    )
}

export default UProfile
