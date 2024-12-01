import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

import { FilterType, UserData } from "./TypeSlice"

import { useAppDispatch } from "../hooks/hooks";
import { authorizationtAsync } from "./authSlice";
import { userAPI } from "../apiOld/api";
type PhotosType = {
    small: string | null
    large: string | null
}
type UsersType = {
    name: string,
    id: number,
    photos: PhotosType
    status: string,
    followed: boolean
}
type InitialStateType = {
    users: Array<UsersType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    filter: { term: string, friend: null | boolean }
}

const initialState: InitialStateType = {
    users: [],
    pageSize: 20,
    totalUsersCount: 0,
    currentPage: 5,
    isFetching: true,
    followingInProgress: [],
    filter: {
        term: '',
        friend: null
    }
};

export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export const userSlice = createAppSlice({
    name: "user",
    initialState,
    reducers: create => ({
        follow: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.users = state.users.map(u => {
                    if (u.id === action.payload) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        ),
        unfollow: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.users = state.users.map(u => {
                    if (u.id === action.payload) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        ),
        setUsers: create.reducer(
            (state, action: PayloadAction<UsersType[]>) => {
                state.users = action.payload
            }
        ),
        setCurrentPage: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.currentPage = action.payload
            }
        ),
        setCurrentUsersCount: create.reducer(
            (state, action: PayloadAction<number>) => {
                console.log(1)
                state.totalUsersCount = action.payload
            }
        ),
        toggleIsFetching: create.reducer(
            (state, action: PayloadAction<boolean>) => {
                state.isFetching = action.payload
            }
        ),
        toggleIsFollowingProgress: create.reducer(
            (state, action: PayloadAction<{ isFetching: boolean, userId: number }>) => {
                state.followingInProgress = action.payload.isFetching
                    ? [...state.followingInProgress, action.payload.userId]
                    : state.followingInProgress.filter(id => id != action.payload.userId)
            }
        ),
        setCurrentFilter: create.reducer(
            (state, action: PayloadAction<FilterType>) => {
                if(action.payload) {
                    state.filter = action.payload
                } else {
                    console.log(action.payload)

                }
                
            }
        ),









        getUsersAsync: create.asyncThunk(
            async ({ currentPage, pageSize, filter }, { dispatch }) => {

                dispatch(toggleIsFetching(true));
                dispatch(setCurrentFilter(filter));
                let response = await userAPI.getUsersAPI(currentPage, pageSize, filter.term, filter.friend)
                dispatch(toggleIsFetching(false));
                dispatch(setUsers(response.data.items));
                dispatch(setCurrentUsersCount(response.data.totalCount));
            },
            // {
            //     pending: state => {
            //         state.status = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.status = "idle"
            //     },
            //     rejected: state => {
            //         state.status = "failed"
            //     },
            // },
        ),
        onPageChangedAsync: create.asyncThunk(
            async ({ pageNumber, pageSize, filter }, { dispatch }) => {
                dispatch(setCurrentPage(pageNumber));
                dispatch(toggleIsFetching(true))
                dispatch(setCurrentFilter(filter));
                let response = await userAPI.retGetUsersAPI(pageNumber, pageSize, filter.term, filter.friend);
                dispatch(toggleIsFetching(false))
                dispatch(setUsers(response.data.items));
            },
            // {
            //     pending: state => {
            //         state.status = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.status = "idle"
            //     },
            //     rejected: state => {
            //         state.status = "failed"
            //     },
            // },
        ),
        followAsync: create.asyncThunk(
            async (userId: number, { dispatch }) => {
                let isFetching = true
                dispatch(toggleIsFollowingProgress({ isFetching, userId }));
                let response = await userAPI.followAPI(userId)
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(follow(userId));
                }
                isFetching = false
                dispatch(toggleIsFollowingProgress({ isFetching, userId }));
            },
            // {
            //     pending: state => {
            //         state.status = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.status = "idle"
            //     },
            //     rejected: state => {
            //         state.status = "failed"
            //     },
            // },
        ),
        unfollowAsync: create.asyncThunk(
            async (userId: number, { dispatch }) => {
                let isFetching = true
                dispatch(toggleIsFollowingProgress({isFetching, userId}));
                let response = await userAPI.unfollowAPI(userId);
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(unfollow(userId));
                }
                isFetching = false
                dispatch(toggleIsFollowingProgress({isFetching, userId}));
            },
            // {
            //     pending: state => {
            //         state.status = "loading"
            //     },
            //     fulfilled: (state) => {
            //         state.status = "idle"
            //     },
            //     rejected: state => {
            //         state.status = "failed"
            //     },
            // },
        ),

    }),



    selectors: {
        selectTotalUsersCount: app => app.totalUsersCount,
        selectPageSize: app => app.pageSize,
        selectCurrentPage: app => app.currentPage,
        selectFilter: app => app.filter,
        selectUsers: app => app.users,
        selectFollowingInProgress: app => app.followingInProgress,
        selectIsFetching: app => app.isFetching,


    },
})



export const {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setCurrentUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
    setCurrentFilter,

    getUsersAsync,
    followAsync,
    unfollowAsync,
    onPageChangedAsync
    
} = userSlice.actions


export const {
    selectTotalUsersCount,
    selectPageSize,
    selectCurrentPage,
    selectFilter,
    selectUsers,
    selectFollowingInProgress,
    selectIsFetching,
} = userSlice.selectors
