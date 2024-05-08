import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../configuration/AxiosConfig";
import endPoint from "../configuration/Config";
interface state {
    // GroupedProjects: any[];
    collectionProjects: any[];
    status: string;
    count: number;
}
const initialState: state = {
    // GroupedProjects: [],
    collectionProjects: [],
    status: "ideal",
    count: 0,
};

export const getCollectionTaskApi = async () => {
    return await api.get(endPoint.getCollectionTask);
};

export const getCollectionTaskAction = createAsyncThunk(
    "projectList/getCollectionTaskAction",
    async () => {
        const response = await getCollectionTaskApi();
        console.log("in slice", response.data)
        // const { data, count } = await response.data;
        // console.log("list", data);
        // return { data, count };
        return await response.data;
    }
);
const collectionTaskSlice = createSlice({
    // name: 'groupProjects',
    name: 'collectionTasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCollectionTaskAction.pending, (state, action) => {
            state.status = 'pending'
        });
        builder.addCase(getCollectionTaskAction.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.collectionProjects = [...action.payload.data];
            state.count = action.payload.count;
        });
        builder.addCase(getCollectionTaskAction.rejected, (state, action) => {
            state.status = 'failed';
        });

    }
});
export default collectionTaskSlice.reducer