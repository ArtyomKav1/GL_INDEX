import { configureStore } from "@reduxjs/toolkit"
import { userAPI } from "./store-api/user-api.ts"
import { usersReducer } from "./store-slice/users-slice.ts"
import { profileReducer } from "./store-slice/profile-slice.ts"
import { dialogsReducer } from "./store-slice/dialogs-slice.ts"
import { authReducer } from "./store-slice/auth-slice.ts"
import { appReducer } from "./store-slice/app-slice.ts"
import { chatReducer } from "./store-slice/chat-slice.ts"
import { authAPI } from "./store-api/auth-api.ts"
import { profileAPI } from "./store-api/profile-api.ts"

export const store = configureStore({
    reducer: {
        [userAPI.reducerPath]: userAPI.reducer,
        [authAPI.reducerPath]: authAPI.reducer,
        [profileAPI.reducerPath]: profileAPI.reducer,


        users: usersReducer,
        profile: profileReducer,
        dialogs: dialogsReducer,
        auth: authReducer,
        app: appReducer,
        chat: chatReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware, authAPI.middleware, profileAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
