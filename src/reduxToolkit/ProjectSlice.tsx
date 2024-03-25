import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiStatus, IProjectFormInput, IProjectUpdateInput, projectResponce } from "../component/project/ProjectType";
import { api } from "../configuration/AxiosConfig";
import endPoint from "../configuration/Config";


export const IProject = {
    id: '',
    title: "",
    description: "",
    isActive: "",
    createdAt: ""
}
export const stateStatus = {
    ideal: 'ideal',
    pending: 'pending',
    succeeded: 'succeeded',
    failed: 'failed'
}

export const getProjectListApi = async () => {
    return await api.get(endPoint.getProject);
};
export const getProjectByIdApi = async (projectId: string) => {
    const url = `${endPoint.getProjectById}${projectId}`;
    console.log(url, projectId);
    return await api.get(url);
};
export const createProjectApi = async (projectData: IProjectFormInput) => {
    return await api.post<projectResponce>(endPoint.createProject, projectData);
};
export const updateProjectApi = async (updatedData: IProjectUpdateInput) => {
    return await api.put(endPoint.updateProject, updatedData);
};

const initialState = {
    IProject: [],
    projectStatus: stateStatus.ideal,
    getProjectFormStatus: stateStatus,
    updateProjectFormStatus: stateStatus.ideal,
    createProjectFormStatus: stateStatus.ideal,
};

export const getProjectListAction = createAsyncThunk(
    "projectList/getProjectListAction",
    async () => {
        const response = await getProjectListApi();
        return response.data;
    }
);
export const getProjectByIdAction = createAsyncThunk(
    "projectList/getProjectByIdAction",
    async (projectId: string) => {
        const response = await getProjectByIdApi(projectId);
        return response.data;
    }
);
export const createProjectAction = createAsyncThunk(
    "project/createProjectAction",
    async (projectData: IProjectFormInput) => {
        const response = await createProjectApi(projectData);
        // return await response.data;
        const resu = await getProjectListApi();
        return resu.data;
    }
);
export const updateProjectAction = createAsyncThunk(
    "project/updateProjectAction",
    async (updatedData: IProjectUpdateInput) => {
        const response = await updateProjectApi(updatedData);
        // return await response.data;
        const resu = await getProjectListApi();
        return resu.data;
    }
);

const projectSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjectListAction.pending, (state, action) => {
            state.projectStatus = stateStatus.pending
        });
        builder.addCase(getProjectListAction.fulfilled, (state, action) => {
            state.projectStatus = stateStatus.succeeded
            state.IProject = action.payload
        });
        builder.addCase(getProjectListAction.rejected, (state, action) => {
            state.projectStatus = stateStatus.failed;
        });


        builder.addCase(getProjectByIdAction.pending, (state, action) => {
            state.projectStatus = stateStatus.pending
        });
        builder.addCase(getProjectByIdAction.fulfilled, (state, action) => {
            state.projectStatus = stateStatus.succeeded
            state.IProject = action.payload
        });
        builder.addCase(getProjectByIdAction.rejected, (state, action) => {
            state.projectStatus = stateStatus.failed;
        });


        builder.addCase(createProjectAction.pending, (state, action) => {
            state.projectStatus = stateStatus.pending;
        });
        builder.addCase(createProjectAction.fulfilled, (state, action) => {
            state.projectStatus = stateStatus.pending;
            state.IProject = action.payload;
            // state.task.push(action.payload);
            state.createProjectFormStatus = stateStatus.succeeded
            // toastSuccess("Cource created Successfully");
        });
        builder.addCase(createProjectAction.rejected, (state) => {
            state.projectStatus = stateStatus.failed;
            // toastSuccess("Error while creating Cources");
        });

        builder.addCase(updateProjectAction.pending, (state, action) => {
            state.updateProjectFormStatus = stateStatus.pending;
        });
        builder.addCase(updateProjectAction.fulfilled, (state, action) => {
            state.updateProjectFormStatus = stateStatus.succeeded;
            // state.IProject.push(action.payload);
            state.IProject = action.payload
        });
        builder.addCase(updateProjectAction.rejected, (state, action) => {
            state.updateProjectFormStatus = stateStatus.failed;

        });
    }
});
export default projectSlice.reducer