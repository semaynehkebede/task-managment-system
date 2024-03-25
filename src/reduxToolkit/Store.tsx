import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import loginReducer from '../reduxToolkit/auth/LoginSlice'
import { setupListeners } from "@reduxjs/toolkit/query";
import projectReducer from "./ProjectSlice";
import taskReducer from "./TaskSlice";
import userReducer from "./UserSlice";

export const store = configureStore({
    reducer: {
        login: loginReducer,
        projectList: projectReducer,
        taskList: taskReducer,
        userList: userReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;