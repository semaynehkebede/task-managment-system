import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { getUserByIdAction } from '../../reduxToolkit/UserSlice';
import { useAppDispatch } from '../../hooks/Hooks';
import { getUserId } from '../../configuration/RoleConfig';

const UProfile = () => {
    const userId = getUserId();
    const dispatch = useAppDispatch();
    // const { list: { data: userData, count: uCount }, listStatus } = useSelector((state: any) => state.userList);
    useEffect(() => {
        dispatch(getUserByIdAction(userId))
    }, []);
    const { list } = useSelector((state: any) => state.userList);
    // console.log(list);
    console.log("user prxsadsadso", list);
    return (
        <div className="flex justify-center items-center mt-6">
            <p>Profile {list.name}</p>
        </div>
    )
}

export default UProfile
