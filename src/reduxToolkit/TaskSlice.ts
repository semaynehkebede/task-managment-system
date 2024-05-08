import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../configuration/AxiosConfig";
import endPoint from "../configuration/Config";
import { ApiStatus, ITaskFormInput, ITaskState, ITaskUpdateInput, archiveInput, taskResponce } from "../component/task/TaskType";

export const getTaskListApi = async (skip: number) => {
    const url = `${endPoint.getTaskList}?top=5&skip=${skip}&includes[0]=assignee&includes[1]=project`
    return await api.get(url);
};
export const getTaskByProjectIdApi = async (id: string) => {
    const url = `${endPoint.getTaskByProjectId}${id}`;
    return await api.get(url);
    return await api.get(endPoint.getTaskList);
};
export const getUserTaskListApi = async () => {
    return await api.get(endPoint.getUserTaskList);
};
export const createTaskApi = async (taskData: ITaskFormInput) => {
    return await api.post<taskResponce>(endPoint.createTask, taskData);
};
export const updateTaskApi = async (taskData: ITaskUpdateInput) => {
    return await api.put<taskResponce>(endPoint.updateTask, taskData);
};
export const deleteTaskApi = async (id: string) => {
    const url = `${endPoint.deleteTask}${id}`;
    return await api.delete(url);
};
export const archiveTaskApi = async (archiveData: any) => {
    return await api.delete<taskResponce>(endPoint.archiveTask, archiveData);
};
// export const getCollectionTaskApi = async () => {
//     return await api.get(endPoint.getCollectionTask);
// };
const initialState: ITaskState = {
    task: [],
    taskListStatus: ApiStatus.ideal,
    updateTaskFormStatus: ApiStatus.ideal,
    createTaskFormStatus: ApiStatus.ideal,
    deleteStatus: ApiStatus.ideal,
    archiveStatus: ApiStatus.ideal,
};
export const getTaskListAction = createAsyncThunk(
    "taskList/getTaskListAction",
    async (skip: number) => {
        const response = await getTaskListApi(skip);
        const data = await response.data;
        return data;
    }
);
export const getTaskByProjectIdAction = createAsyncThunk(
    "taskListByPId/getTaskByProjectIdAction",
    async (id: string) => {
        const response = await getTaskByProjectIdApi(id);
        return await response.data;
    }
);
export const getUserTaskListAction = createAsyncThunk(
    "userTaskList/getUserTaskListAction",
    async () => {
        const response = await getUserTaskListApi();
        return await response.data;
    }
);

export const createTaskAction = createAsyncThunk(
    "task/createTaskAction",
    async (taskData: ITaskFormInput) => {
        const response = await createTaskApi(taskData);
        // return await response.data;
        const resu = await getTaskListApi(0);
        return resu.data;
    }
);
export const updateTaskAction = createAsyncThunk(
    "task/updateTaskAction",
    async (taskData: ITaskUpdateInput) => {
        const response = await updateTaskApi(taskData);
        // return await response.data;
        const resu = await getTaskListApi(0);
        return resu.data;
    }
);
export const deleteTaskAction = createAsyncThunk(
    "taskList/deleteTaskAction",
    async (taskId: string) => {
        const response = await deleteTaskApi(taskId);
        const resu = await getTaskListApi(0);
        return await resu.data;
    }
);
export const archiveTaskAction = createAsyncThunk(
    "taskList/archiveTaskAction",
    async (archiveData: archiveInput) => {
        console.log("in thunk", archiveData);
        const response = await archiveTaskApi(archiveData);
        const resu = await getTaskListApi(0);
        return await resu.data;
    }
);

export const taskSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTaskListAction.pending, (state, action) => {
            state.taskListStatus = ApiStatus.loading;
        });
        builder.addCase(getTaskListAction.fulfilled, (state, action) => {
            state.taskListStatus = ApiStatus.success;
            state.task = action.payload;
        });
        builder.addCase(getTaskListAction.rejected, (state, action) => {
            state.taskListStatus = ApiStatus.error;
        });

        builder.addCase(getUserTaskListAction.pending, (state, action) => {
            state.taskListStatus = ApiStatus.loading;
        });
        builder.addCase(getUserTaskListAction.fulfilled, (state, action) => {
            state.taskListStatus = ApiStatus.success;
            state.task = action.payload;
        });
        builder.addCase(getUserTaskListAction.rejected, (state, action) => {
            state.taskListStatus = ApiStatus.error;
        });

        builder.addCase(getTaskByProjectIdAction.pending, (state, action) => {
            state.taskListStatus = ApiStatus.loading;
        });
        builder.addCase(getTaskByProjectIdAction.fulfilled, (state, action) => {
            state.taskListStatus = ApiStatus.success;
            state.task = action.payload;
        });
        builder.addCase(getTaskByProjectIdAction.rejected, (state, action) => {
            state.taskListStatus = ApiStatus.error;
        });


        builder.addCase(createTaskAction.pending, (state) => {
            state.taskListStatus = ApiStatus.error;
        });
        builder.addCase(createTaskAction.fulfilled, (state, action) => {
            state.taskListStatus = ApiStatus.success;
            // state.task.push(action.payload);
            state.createTaskFormStatus = ApiStatus.success
            state.task = action.payload;
        });
        builder.addCase(createTaskAction.rejected, (state) => {
            state.taskListStatus = ApiStatus.error;
        });


        builder.addCase(updateTaskAction.pending, (state, action) => {
            state.updateTaskFormStatus = ApiStatus.loading
        });
        builder.addCase(updateTaskAction.fulfilled, (state, action) => {
            // state.task.push(action.payload);
            state.updateTaskFormStatus = ApiStatus.success
            state.task = action.payload;
        });
        builder.addCase(updateTaskAction.rejected, (state, action) => {
            state.updateTaskFormStatus = ApiStatus.error
        });


        builder.addCase(deleteTaskAction.pending, (state, action) => {
            state.deleteStatus = ApiStatus.loading
        });
        builder.addCase(deleteTaskAction.fulfilled, (state, action) => {
            state.deleteStatus = ApiStatus.success;
            // state.task.push(action.payload);
            state.task = action.payload;
        });
        builder.addCase(deleteTaskAction.rejected, (state, action) => {
            state.deleteStatus = ApiStatus.error;
        });
        builder.addCase(archiveTaskAction.pending, (state, action) => {
            state.archiveStatus = ApiStatus.loading
        });
        builder.addCase(archiveTaskAction.fulfilled, (state, action) => {
            state.archiveStatus = ApiStatus.success;
            // state.task.push(action.payload);
            state.task = [...action.payload];
        });
        builder.addCase(archiveTaskAction.rejected, (state, action) => {
            state.archiveStatus = ApiStatus.error;
        });

    }
}
)
export default taskSlice.reducer