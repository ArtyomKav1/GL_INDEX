import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PhotosType, PostsType, ProfileType } from "./Type-Slice";




let initialState = {
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







export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

        addNewPost: (state, action: PayloadAction<{ textPost: string }>) => {
            let newPost = {
                id: 5,
                message: action.payload.textPost,
                likesCount: 0
            };
            state.posts = [...state.posts, newPost]
        },

        deletePost: (state, action: PayloadAction<{ postId: number }>) => {
            state.posts = state.posts.filter(p => p.id != action.payload.postId)
        },

        setUserProfile: (state, action: PayloadAction<{ profile: ProfileType }>) => {
            state.profile = action.payload.profile
        },

        setUserStatus: (state, action: PayloadAction<{ status: string }>) => {
            state.status = action.payload.status
        },

        setPhoto: (state, action: PayloadAction<{ photos: PhotosType }>) => {
            state.profile.photos = action.payload.photos
        },

        setEditMode: (state, action: PayloadAction<{ result: boolean }>) => {
            state.editMode = action.payload.result
        },

        addLike: (state, action: PayloadAction<{ postId: number }>) => {
            state.posts = state.posts.map(p => {
                if (p.id === action.payload.postId) {
                    p.likesCount = p.likesCount + 1
                }
                return p
            })
        },

        removeLike: (state, action: PayloadAction<{ postId: number }>) => {
            state.posts = state.posts.map(p => {
                if (p.id === action.payload.postId && p.likesCount > 0) {
                    p.likesCount = p.likesCount - 1
                }
                return p
            }
            )
        },







    }
})





export const profileReducer = profileSlice.reducer
export const profileAction = profileSlice.actions