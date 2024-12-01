import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProfileType, UpdateProfileAPIType, UpdateStatusAPIType, valueType } from "./type-api";





export const profileAPI = createApi({
    reducerPath: 'api/profile',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0/' }),

    endpoints: (builder) => ({
        getProfileAPI: builder.query<ProfileType, number | null>({
            query: (userId) => ({
                url: `profile/${userId}`,
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            }),
        }),
        getStatusAPI: builder.query<string, number | null>({
            query: (userId) => ({
                url: `profile/status/${userId}`,
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            })
        }),
        updateStatusAPI: builder.mutation<UpdateStatusAPIType, string>({
            query: (status) => ({
                url: `profile/status`,
                body: { status },
                method: 'PUT',
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            })
        }),
        // savePhotoAPI: builder.mutation<>({
        //     const formData = new FormData();
        //     formData.append("image", file);
        //     query: (formData) => ({
        //         url: `profile/photo`,
        //         body: formData,
        //         method: 'PUT',
        //         headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73", 'Content-Type': 'multipart/form-data' },
        //         withCredentials: true,
        //     })
        // }),
        updateProfileAPI: builder.mutation<UpdateProfileAPIType, valueType>({
            query: (profileData) => ({
                url: `profile`,
                body: profileData,
                method: 'PUT',
                headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
                withCredentials: true,
            })
        }),

    }),
})

export const {
    useGetProfileAPIQuery,
    useGetStatusAPIQuery,
    useUpdateProfileAPIMutation,
    useUpdateStatusAPIMutation
} = profileAPI