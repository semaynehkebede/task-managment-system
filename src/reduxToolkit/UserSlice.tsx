import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../configuration/AxiosConfig";
import endPoint from "../configuration/Config";
import { IUserFormInput, IUserState, stateStatus, userListModel } from "../component/user/UserType";

//  RTK Query
const initialState: IUserState = {
    list: [],
    listStatus: stateStatus.ideal,
    createUserFormStatus: stateStatus.ideal,
    updateUserFormStatus: stateStatus.ideal,
};
export const getUserListApi = async () => {
    return await api.get(endPoint.getUserList);
};
export const getUserByIdApi = async (id: string) => {
    const url = `${endPoint.getUserById}${id}`;
    console.log(url, id);
    return await api.get(url);
};
export const createUserApi = async (userData: IUserFormInput) => {
    return await api.post<userListModel>(endPoint.createUser, userData);
}
export const getUserListAction = createAsyncThunk(
    "userList/getUserListAction",
    async () => {
        const response = await getUserListApi();
        return await response.data;
    }
);
export const getUserByIdAction = createAsyncThunk(
    "userById/getUserByIdAction",
    async (id: string) => {
        // let id = "1234f"
        const response = await getUserByIdApi(id);
        console.log("asynch", response.data);
        return await response.data;
    }
);
export const createUserAction = createAsyncThunk(
    "user/createUserAction",
    async (userData: IUserFormInput) => {
        const response = await createUserApi(userData);
        ////////////////////////
        // return await response.data;
        ////////////////////////

        ////////////correct////////////
        const resu = await getUserListApi();
        console.log("thunck", resu.data)
        return resu.data;
        //////////////////////////////
    }
);
export const userSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUserListAction.pending, (state, action) => {
            state.listStatus = stateStatus.loading;
        });
        builder.addCase(getUserListAction.fulfilled, (state, action) => {
            state.listStatus = stateStatus.success;
            state.list = action.payload;
        });
        builder.addCase(getUserListAction.rejected, (state, action) => {
            state.listStatus = stateStatus.error;
        });



        builder.addCase(getUserByIdAction.pending, (state, action) => {
            state.listStatus = stateStatus.loading;
        });
        builder.addCase(getUserByIdAction.fulfilled, (state, action) => {
            state.listStatus = stateStatus.success;
            state.list = action.payload;
        });
        builder.addCase(getUserByIdAction.rejected, (state, action) => {
            state.listStatus = stateStatus.error;
        });
        builder.addCase(createUserAction.pending, (state) => {
            state.listStatus = stateStatus.loading;
        });
        builder.addCase(createUserAction.fulfilled, (state, action) => {
            state.listStatus = stateStatus.success;
            state.createUserFormStatus = stateStatus.success;
            // state.list = [...state.list, action.payload];
            // state.list.push(action.payload);
            state.list = action.payload;
        });
        builder.addCase(createUserAction.rejected, (state) => {
            state.listStatus = stateStatus.error;
            // toastSuccess("Error while creating Cources");
        });
    }
}
)
export default userSlice.reducer
