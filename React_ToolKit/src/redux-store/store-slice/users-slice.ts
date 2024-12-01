import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FilterType, UsersInitialStateType, UsersType, } from "./Type-Slice.ts";
import { useFollowAPIMutation, useLazyGetUsersAPIQuery, useUnfollowAPIMutation } from "../store-api/user-api.ts";
import { userAPI } from "../../api/api.ts";


const initialState: UsersInitialStateType = {
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
}

// // const [followAPI] = useFollowAPIMutation()
// // const [unfollowAPI] = useUnfollowAPIMutation()
// type GetUsersData = {
//     currentPage: number, pageSize: number, filter: FilterType
// }
// type response = typeof response
// export const GetUsersAsyncThunk = createAsyncThunk<response, GetUsersData, { rejectValue: string }>(
//     'users/GetUsersAsyncThunk',
//     async function ({ currentPage, pageSize, filter }, {  }) {
//         let response = await userAPI.getUsersAPI(currentPage, pageSize, filter.term, filter.friend);
//         console.log(response)
//         console.log('3')
//         return response




//         // const [GetUsersAPI] = useLazyGetUsersAPIQuery()
//         // // dispatch(setCurrentPage(currentPage));
//         // // dispatch(setCurrentFilter(filter))
//         // const { term, friend } = filter

//         // GetUsersAPI({ currentPage, pageSize, term, friend })
//         //     .unwrap()
//         //     .then(res => {return res})
//         //     .catch((error) => console.log(error));
//     }
// )












export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {


        follow: (state, action: PayloadAction<number>) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload) {
                    return { ...u, followed: true }
                }
                return u;
            })
        },
        unfollow: (state, action: PayloadAction<number>) => {
            state.users = state.users.map(u => {
                if (u.id === action.payload) {
                    return { ...u, followed: false }
                }
                return u;
            })
        },
        setUsers: (state, action: PayloadAction<UsersType[]>) => {
            state.users = action.payload
        },

        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },


        setCurrentUsersCount: (state, action: PayloadAction<number>) => {
            state.totalUsersCount = action.payload
        },


        toggleIsFetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        },


        toggleIsFollowingProgress: (state, action: PayloadAction<{ isFetching: boolean, userId: number }>) => {
            state.followingInProgress = action.payload.isFetching
                ? [...state.followingInProgress, action.payload.userId]
                : state.followingInProgress.filter(id => id != action.payload.userId)
        },


        setCurrentFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(GetUsersAsyncThunk.fulfilled, (state, action) => {
    //             console.log('4')
    //             state.users = action.payload.items
    //             state.totalUsersCount = action.payload.totalCount

    //         })
    // },
})




export const {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setCurrentUsersCount,
    toggleIsFetching,
    toggleIsFollowingProgress,
    setCurrentFilter

} = usersSlice.actions

export const usersReducer = usersSlice.reducer
export const usersAction = usersSlice.actions

































function retGetUsersAPI(arg0: { pageNumber: number; pageSize: number; term: string; friend: boolean | null; }): { data: any; isError: any; isSuccess: any; } {
    throw new Error("Function not implemented.");
}

