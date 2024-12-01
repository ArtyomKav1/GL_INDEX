import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { ArgGetUsersAPIType, ArgretGetUsersAPI, FollowAPIType, GetUsersAPIType } from "./type-api"





// export const userAPI = createApi({
//     reducerPath: 'api/user',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0/' }),
//     endpoints: build => ({
//         getUsersAPI: build.query<GetUsersAPIType, ArgGetUsersAPIType>({ query: ({ currentPage = 1, pageSize = 10, term, friend = null }) => `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`) })
//     })
// })

// export const { useLazyGetUsersAPIQuery } = userAPI


export const userAPI = createApi({
    reducerPath: 'api/user',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0/' }),

    endpoints: (builder) => ({
        getUsersAPI: builder.query<GetUsersAPIType, ArgGetUsersAPIType>({
            query: ({ currentPage = 1, pageSize = 10, term, friend = null }) => ({
                url: `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`),
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            }),
        }),
        //TODO возможно убрать этот запрос он повторяющийся 
        retGetUsersAPI: builder.query<GetUsersAPIType, ArgretGetUsersAPI>({
            query: ({ pageNumber = 1, pageSize = 10, term, friend = null }) => ({
                url: `users?page=${pageNumber}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`),
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            })
        }),
        followAPI: builder.mutation<FollowAPIType, number>({
            query: (userId: number) => ({
                url: `follow/${userId}`,
                method: 'POST',
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            })
        }),
        unfollowAPI: builder.mutation<FollowAPIType, number>({
            query: (userId: number) => ({
                url: `follow/${userId}`,
                method: 'DELETE',
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            })
        }),

    }),
})





export const {

    useLazyGetUsersAPIQuery,
    useRetGetUsersAPIQuery,
    useFollowAPIMutation,
    useUnfollowAPIMutation
} = userAPI












// export const userAPI = {
//     getUsersAPI(currentPage: number = 1, pageSize: number = 10, term: string, friend: null | boolean = null) {
//         return instance.get<GetUsersAPIType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`))
//             .then(response => {
//                 return response;
//             });
//     },
//     retGetUsersAPI(pageNumber: number = 1, pageSize: number = 10, term: string, friend: null | boolean = null) {
//         return instance.get<GetUsersAPIType>(`users?page=${pageNumber}&count=${pageSize}&term=${term}` + (friend == null ? '' : `&friend=${friend}`))
//     },
//     followAPI(userId: number) {
//         return instance.post<FollowAPIType>(`follow/${userId}`)
//     },
//     unfollowAPI(userId: number) {
//         return instance.delete<FollowAPIType>(`follow/${userId}`)
//     },
//     getProfileAPI(userId: number | null) {
//         // console.warn('test - Obsolete method. Please use profileAPI object')
//         return profileAPI.getProfileAPI(userId);
//     }

// }
