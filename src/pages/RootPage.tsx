import React from 'react'

const RootPage = () => {
    return (
        <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
            <h2 className="mb-1 text-lg font-extrabold leading-tight text-center">Services of Task Management System</h2>
            <div className="w-full my-7 text-center">
                <div className="flex flex-col w-full mb-10 sm:flex-row">
                    <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                        <div className="relative h-full ml-0 mr-0 sm:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">Task Management System Proved</h3>
                                </div>
                                <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">------------</p>
                                <p className="mb-2 text-gray-600">A smart task management system should provide users with a high-performing collaboration
                                    channel. Company employees should be able to exchange necessary information related to
                                    everyday projects and tasks.
                                    This feature should be easy to use so that users don’t get confused and can use it comfortably.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-1/2">
                        <div className="relative h-full ml-0 md:mr-10">
                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                            <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                                <div className="flex items-center -mt-1">
                                    <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">To implement this project you have to use the following technologies</h3>
                                </div>
                                <hr className='text-lg' />
                                <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">------------</p>
                                <ul className="mb-2 text-gray-600">
                                    <li>UI Library(Kit):</li>
                                    <li>Mantine:https://mantine.dev/pages/getting-started/</li>
                                    <li>State management: redux toolkit https://redux-toolkit.js.org/</li>
                                    <li>Icon: https://tabler-icons.io/</li>
                                    <li>Style: Tailwindcss https://tailwindcss.com/docs/installation</li>
                                    <li>Utility:Axios https://axios-http.com/</li>
                                    <li>Route Management: https://reactrouter.com/en/main</li>
                                    <li>Form validation:
                                        ○ https://react-hook-form.com/
                                        ○ https://www.npmjs.com/package/yup
                                        ○ https://www.npmjs.com/package/@hookform/resolvers
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default RootPage
