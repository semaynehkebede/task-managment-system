import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../configuration/AxiosConfig";
import endPoint from "../configuration/Config";
interface state {
    groupedProjects: any[];
    status: string;
    count: number;
}
const initialState: state = {
    groupedProjects: [],
    status: "ideal",
    count: 0,
};

export const getGroupedProjectListApi = async () => {
    return await api.get(endPoint.getGroupedProject);
};

export const getGroupedProjectListAction = createAsyncThunk(
    "projectList/getGroupedProjectListAction",
    async () => {
        const response = await getGroupedProjectListApi();
        // const { data, count } = await response.data;
        // console.log("list", data);
        // return { data, count };
        return await response.data;
    }
);
const groupProjectSlice = createSlice({
    name: 'groupProjects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getGroupedProjectListAction.pending, (state, action) => {
            state.status = 'pending'
        });
        builder.addCase(getGroupedProjectListAction.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.groupedProjects = [...action.payload.data];
            state.count = action.payload.count;
        });
        builder.addCase(getGroupedProjectListAction.rejected, (state, action) => {
            state.status = 'failed';
        });

    }
});
export default groupProjectSlice.reducer