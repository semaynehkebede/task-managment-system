import React, { useEffect } from 'react'
import { getGroupedProjectListAction } from './reduxToolkit/GroupProjectSlice';
import { useAppDispatch } from './hooks/Hooks';
import { getTaskListAction } from './reduxToolkit/TaskSlice';
import { getUserListAction } from './reduxToolkit/UserSlice';
import { getProjectListAction } from './reduxToolkit/ProjectSlice';
// import { getCollectionTaskAction } from './reduxToolkit/TaskSlice';
// import { getCollectionTaskAction } from './reduxToolkit/CollectionTaskSlice';

const LoadData = () => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getGroupedProjectListAction());
        // dispatch(getTaskListAction());
        // dispatch(getCollectionTaskAction());
        dispatch<any>(getUserListAction());
        dispatch<any>(getProjectListAction());
    }, [])
    return (<></>);
}

export default LoadData
