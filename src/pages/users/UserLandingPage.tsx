import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getUserByIdAction } from '../../reduxToolkit/UserSlice';
import { getUserTaskListAction } from '../../reduxToolkit/TaskSlice';
import { getRole, getUserId } from '../../configuration/RoleConfig';
import { useAppDispatch } from '../../hooks/Hooks';

const UserLandingPage = () => {

    const userId = getUserId();
    const isAdmin = getRole();
    const logUserId = getUserId();
    const dispatch = useAppDispatch();
    useEffect(() => {

        dispatch(getUserByIdAction(userId))
        dispatch(getUserTaskListAction())
    }, [])
    const { task: { data, count }, taskStatus } = useSelector((state: any) => state.taskList);
    return (
        <div>
            <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
                <h2 className="mb-1 text-lg font-extrabold leading-tight text-gray-900 text-center">Summerized Information in Task Management System</h2>
                <div className="w-full my-7 text-center">
                    <div className="flex flex-col w-full mb-10 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Total Projects</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                    {/* <p className="mb-2 text-gray-600">{totalProject}</p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-full mb-5 sm:flex-row">
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                                {/* <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span> */}
                                <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                                    <div className="flex items-center content-center">
                                        <h3 className="text-lg font-bold text-gray-800 content-center">Total Tasks</h3>
                                    </div>
                                    <p className="mb-2 text-gray-600">{count}</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                            <div className="relative h-full ml-0 mr-0 sm:mr-10">
                                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Closed Tasks</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">10</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="relative h-full ml-0 md:mr-10">
                                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                                <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                                    <div className="flex items-center -mt-1">
                                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Pending Tasks</h3>
                                    </div>
                                    <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">------------</p>
                                    <p className="mb-2 text-gray-600">13</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLandingPage
