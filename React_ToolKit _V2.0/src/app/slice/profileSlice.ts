import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "./createAppSlice"

import { PhotosType, PostsType, ProfileType, UserData } from "./TypeSlice"
import { authAPI, profileAPI, securityAPI, userAPI } from "../apiOld/api";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { valueType } from "../api/TypeApi";
import { selectUserId } from "./authSlice";



const initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'Its my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 },
        { id: 5, message: 'Dada', likesCount: 11 },
    ] as Array<PostsType>,

    profile: null as ProfileType | null,
    status: '' as string,
    editMode: false as boolean,
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}


export const profileSlice = createAppSlice({
    name: "profile",
    initialState,
    reducers: create => ({


        addNewPost: create.reducer(
            (state, action: PayloadAction<string>) => {
                let newPost = {
                    id: 5,
                    message: action.payload,
                    likesCount: 0
                };
                state.posts = [...state.posts, newPost]
            }
        ),

        deletePost: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.posts = state.posts.filter(p => p.id != action.payload)
            }
        ),

        setUserProfile: create.reducer(
            (state, action: PayloadAction<ProfileType>) => {
                state.profile = action.payload
            }
        ),

        setUserStatus: create.reducer(
            (state, action: PayloadAction<string>) => {
                state.status = action.payload
            }
        ),

        setPhoto: create.reducer(
            (state, action: PayloadAction<PhotosType>) => {
                if (state.profile) { state.profile.photos = action.payload }


            }
        ),

        setEditMode: create.reducer(
            (state, action: PayloadAction<boolean>) => {
                state.editMode = action.payload
            }
        ),

        addLike: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.posts = state.posts.map(p => {
                    if (p.id === action.payload) {
                        p.likesCount = p.likesCount + 1
                    }
                    return p
                })
            }
        ),

        removeLike: create.reducer(
            (state, action: PayloadAction<number>) => {
                state.posts = state.posts.map(p => {
                    if (p.id === action.payload && p.likesCount > 0) {
                        p.likesCount = p.likesCount - 1
                    }
                    return p
                }
                )
            }
        ),












        getUserProfileAsync: create.asyncThunk(
            async (userId: number | null, { dispatch }) => {
                let response = await userAPI.getProfileAPI(userId)
                dispatch(setUserProfile(response.data));
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

        getUserStatusAsync: create.asyncThunk(
            async (userId: number | null, { dispatch }) => {
                let response = await profileAPI.getStatusAPI(userId)
                dispatch(setUserStatus(response.data));
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

        updateUserStatusAsync: create.asyncThunk(
            async (status: string, { dispatch }) => {
                let response = await profileAPI.updateStatusAPI(status)
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(setUserStatus(status));
                }
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


        savePhotoAsync: create.asyncThunk(
            async (file: any, { dispatch }) => {
                let response = await profileAPI.savePhotoAPI(file);
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(setPhoto(response.data.data.photos));
                }
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

        saveProfileAsync: create.asyncThunk(

            async (profileData: valueType, { dispatch, getState }) => {
                //TODO херня с селектором

                const userId: number | null = getState().auth.userId

                const response = await profileAPI.updateProfileAPI(profileData)
                if (response.data.resultCode === ResultCodeEnum.Success) {
                    dispatch(setEditMode(false))
                    dispatch(getUserProfileAsync(userId))
                } else {

                    // dispatch(stopSubmit("ProfileDataForm", { "contacts": { "facebook": response.data.messages[0] } }))
                    // @ts-ignore
                    dispatch(stopSubmit("ProfileDataForm", { _error: response.data.messages[0] }));
                }
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
        selectProfile: profile => profile.profile,
        selectStatus: profile => profile.status,
        selectEditMode: profile => profile.editMode,
        selectPosts: profile => profile.posts,

    },
})



export const {
    addLike,
    addNewPost,
    removeLike,
    setEditMode,
    setPhoto,
    setUserProfile,
    setUserStatus,
    deletePost,


    getUserStatusAsync,
    savePhotoAsync,
    saveProfileAsync,
    getUserProfileAsync,
    updateUserStatusAsync,
} = profileSlice.actions


export const {
    selectProfile,
    selectStatus,
    selectEditMode,
    selectPosts

} = profileSlice.selectors

