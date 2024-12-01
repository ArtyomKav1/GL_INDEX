// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
// import { Argloginlogin, GetCaptchaUrl, LoginResponseType, MeResponseType } from "./TypeApi"











// export const authAPI = createApi({
//     reducerPath: 'api/auth',
//     baseQuery: fetchBaseQuery({ baseUrl: 'https://social-network.samuraijs.com/api/1.0/' }),
//     endpoints: (builder) => ({
//         me: builder.query<MeResponseType, void>({
//             query: () => ({
//                 url: `auth/me `,
//                 headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
//                 withCredentials: true,
//             }),
//         }),
//         login: builder.mutation<LoginResponseType, Argloginlogin>({
//             query: ({ email, password, rememberMe = true, captchaUrl = null }) => ({
//                 url: `auth/login`,
//                 body: { email, password, rememberMe, captchaUrl },
//                 headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
//                 withCredentials: true,
//                 method: 'POST',
//             }),
//         }),

//         logout: builder.mutation<void, void>({
//             query: () => ({
//                 url: `auth/login`,
//                 headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
//                 withCredentials: true,
//                 method: 'DELETE',
//             }),
//         }),
//         getCaptchaUrl: builder.query<GetCaptchaUrl, void>({
//             query: () => ({
//                 url: `security/get-captcha-url`,
//                 headers: { "API-KEY": "28fecdfd-75fe-4ebb-998d-a57490880d73" },
//                 withCredentials: true,
//             }),
//         }),



//     }),
// })



// export const {
//     useLazyMeQuery,
//     useLoginMutation,
//     useLogoutMutation,
//     useLazyGetCaptchaUrlQuery
// } = authAPI




