import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";

const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            console.log("user", action.payload);
            const { user, accessToken } = action.payload
            localStorage.setItem("userInfo", JSON.stringify({
                user: user,
                token: accessToken,
            })
            );
            state.user = user
            state.token = accessToken
        },
        logOut: (state, action) => {
            localStorage.clear();
            state.user = null
            state.token = null
        }
    }
})
export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer
export const selectCurrentUser = (state: any) => state.auth.user
export const selectCurrentToken = (state: any) => state.auth.token