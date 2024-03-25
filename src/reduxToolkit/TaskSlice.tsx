import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../configuration/AxiosConfig";
import endPoint from "../configuration/Config";
import { ApiStatus, ITaskFormInput, ITaskState, ITaskUpdateInput, taskResponce } from "../component/task/TaskType";
import { string } from "yup";
//  RTK Query
export const getTaskListApi = async () => {
    return await api.get(endPoint.getTaskList);
};
export const getTaskByProjectIdApi = async (id: string) => {
    const url = `${endPoint.getTaskByProjectId}${id}`;
    console.log(url, id);
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
const initialState: ITaskState = {
    task: [],
    taskListStatus: ApiStatus.ideal,
    updateTaskFormStatus: ApiStatus.ideal,
    createTaskFormStatus: ApiStatus.ideal,
};
export const getTaskListAction = createAsyncThunk(
    "taskList/getTaskListAction",
    async () => {
        const response = await getTaskListApi();
        return await response.data;
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
        const resu = await getTaskListApi();
        return resu.data;
    }
);
export const updateTaskAction = createAsyncThunk(
    "task/updateTaskAction",
    async (taskData: ITaskUpdateInput) => {
        console.log("in action", taskData)
        const response = await updateTaskApi(taskData);
        // return await response.data;
        const resu = await getTaskListApi();
        return resu.data;
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

        ////////////get p task/////////////
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
            // toastSuccess("Cource created Successfully");
        });
        builder.addCase(createTaskAction.rejected, (state) => {
            state.taskListStatus = ApiStatus.error;
            // toastSuccess("Error while creating Cources");
        });



        builder.addCase(updateTaskAction.pending, (state, action) => {
            state.taskListStatus = ApiStatus.loading;
            state.updateTaskFormStatus = ApiStatus.loading
        });
        builder.addCase(updateTaskAction.fulfilled, (state, action) => {
            state.taskListStatus = ApiStatus.success;
            // state.task.push(action.payload);
            state.updateTaskFormStatus = ApiStatus.success
            state.task = action.payload;
            // toastSuccess("Cource created Successfully");
        });
        builder.addCase(updateTaskAction.rejected, (state, action) => {
            state.taskListStatus = ApiStatus.error;
            state.updateTaskFormStatus = ApiStatus.error

        });


    }
}
)
export default taskSlice.reducer