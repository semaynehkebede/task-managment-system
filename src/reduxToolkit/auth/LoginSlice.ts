import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import endPoint from "../../configuration/Config";
import { api } from "../../configuration/AxiosConfig";
import { passwordData } from "../../component/user/ChangePassword";

export interface User {
    id: string;
    name: string;
    role: string;
    token: string;
}

export interface UserCredentials {
    email: string;
    password: string;
}

interface AuthState {
    currentUser: User | null;
    loading: boolean;
    error: string | null;
}
const initialState: AuthState = {
    currentUser: null,
    loading: false,
    error: null
};
export const changePasswordApi = async (data: any) => {
    return await api.post(endPoint.changePassword, data);
}
////////////////////1 AsyncThunk////////////////
export const loginUser = createAsyncThunk<User, UserCredentials>(
    'auth/user/loginUser',
    async (credentials: UserCredentials) => {
        const response = await createLoginApi(credentials);
        return await response.data;
    }
);

export const changePassword = createAsyncThunk(
    'auth/user/changePassword',
    async (passwordData: passwordData) => {
        const response = await changePasswordApi(passwordData);
        return await response.data;
    }
);
////////////////////////////////
const loginSlice = createSlice({
    name: 'login',
    initialState: initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, isAdmin } = action.payload.profile;
            const token = action.payload.accessToken;
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify({
                token: token,
                role: isAdmin,
                name: name,
                id: id,
                // token: action.payload.token,
            })
            );
            state.currentUser!.name = action.payload.name;
            state.currentUser!.token = action.payload.token;
            state.currentUser!.role = action.payload.role;
            state.currentUser!.id = action.payload.id;

        },
        logOut: (state) => {
            localStorage.removeItem("user");
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, state => {
            state.currentUser = null;
            state.loading = true;
            state.error = null;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.currentUser = null;
            state.loading = false;
            if (action.payload) {
                state.error = action.payload as string;
            } else {
                state.error = 'Failed user to login';
            }
        });

        builder.addCase(changePassword.pending, state => {
            state.loading = true;
        })
        builder.addCase(changePassword.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = null;
        })
        builder.addCase(changePassword.rejected, (state, action) => {
            state.loading = false;
            if (action.payload) {
                state.error = action.payload as string;
            } else {
                state.error = 'Failed user to change Password';
            }
        });
    }
});

/////////////2 API///////////////
export const createLoginApi = async (data: any) => {
    return await api.post(endPoint.login, data);
}
////////////////////////////////
export const { setUser, logOut } = loginSlice.actions
export default loginSlice.reducer