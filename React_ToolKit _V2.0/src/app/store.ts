import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { combineSlices, configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { authSlice } from "./slice/authSlice"
import { appSlice } from "./slice/appSlice"
import { userSlice } from "./slice/userSlice"
import { profileSlice } from "./slice/profileSlice"
import { dialogsSlice } from "./slice/dialogsSlice"
import { todoSlice } from "./slice/todoSlice"



const rootReducer = combineSlices(
  // counterSlice,
  // quotesApiSlice,
  authSlice,
  appSlice,
  userSlice,
  profileSlice,
  dialogsSlice,
  todoSlice,
)
export type RootState = ReturnType<typeof rootReducer>





export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,





    // middleware: getDefaultMiddleware => {
    //   return getDefaultMiddleware().concat(
    //     // quotesApiSlice.middleware,
    //     authAPI.middleware
    //   )
    // },
    preloadedState,
  })


  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()





export type AppStore = typeof store
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
