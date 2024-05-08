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
export const deleteProjectApi = async (projectId: string) => {
    const url = `${endPoint.deleteProject}${projectId}`;
    console.log(url, projectId);
    return await api.delete(url);
};

const initialState = {
    IProject: [],
    projectStatus: ApiStatus.ideal,
    getProjectFormStatus: ApiStatus,
    updateProjectFormStatus: ApiStatus.ideal,
    createProjectFormStatus: ApiStatus.ideal,
    deleteProjectStatus: ApiStatus.ideal,
};

export const getProjectListAction = createAsyncThunk(
    "projectList/getProjectListAction",
    async () => {
        const response = await getProjectListApi();
        return await response.data;
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
export const deleteProjectAction = createAsyncThunk(
    "projectList/deleteProjectAction",
    async (projectId: string) => {
        const response = await deleteProjectApi(projectId);
        const resu = await getProjectListApi();
        return await resu.data;
    }
);

const projectSlice = createSlice({
    name: 'projectList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProjectListAction.pending, (state, action) => {
            state.projectStatus = ApiStatus.loading
        });
        builder.addCase(getProjectListAction.fulfilled, (state, action) => {
            state.projectStatus = ApiStatus.success
            state.IProject = action.payload
        });
        builder.addCase(getProjectListAction.rejected, (state, action) => {
            state.projectStatus = ApiStatus.success;
        });


        builder.addCase(getProjectByIdAction.pending, (state, action) => {
            state.projectStatus = ApiStatus.loading
        });
        builder.addCase(getProjectByIdAction.fulfilled, (state, action) => {
            state.projectStatus = ApiStatus.success
            state.IProject = action.payload
        });
        builder.addCase(getProjectByIdAction.rejected, (state, action) => {
            state.projectStatus = ApiStatus.error;
        });


        builder.addCase(createProjectAction.pending, (state, action) => {
            state.projectStatus = ApiStatus.loading;
        });
        builder.addCase(createProjectAction.fulfilled, (state, action) => {
            state.projectStatus = ApiStatus.success;
            state.IProject = action.payload;
            // state.task.push(action.payload);
            state.createProjectFormStatus = ApiStatus.success;
            // toastSuccess("Cource created Successfully");
        });
        builder.addCase(createProjectAction.rejected, (state) => {
            state.projectStatus = ApiStatus.error;
            // toastSuccess("Error while creating Cources");
        });

        builder.addCase(updateProjectAction.pending, (state, action) => {
            state.updateProjectFormStatus = ApiStatus.loading;
        });
        builder.addCase(updateProjectAction.fulfilled, (state, action) => {
            state.updateProjectFormStatus = ApiStatus.success;
            // state.IProject.push(action.payload);
            state.IProject = action.payload
        });
        builder.addCase(updateProjectAction.rejected, (state, action) => {
            state.updateProjectFormStatus = ApiStatus.error;
        });

        builder.addCase(deleteProjectAction.pending, (state, action) => {
            state.projectStatus = ApiStatus.loading;
        });
        builder.addCase(deleteProjectAction.fulfilled, (state, action) => {
            state.projectStatus = ApiStatus.success;
            // state.IProject.push(action.payload);
            state.IProject = action.payload
        });
        builder.addCase(deleteProjectAction.rejected, (state, action) => {
            state.projectStatus = ApiStatus.error;
        });
    }
});
export default projectSlice.reducer