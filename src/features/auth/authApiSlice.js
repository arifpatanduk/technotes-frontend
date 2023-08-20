import { apiSlice } from "../../app/api/apiSlice";
import { logOut } from "./authSlice";


export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder = ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/auth',
                method: 'POST',
                body: {...credentials}
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: 'api/auth/logout',
                method: 'POST'
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    // const {data} = 
                    await queryFulfilled
                    // console.log(data)

                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (error) {
                    console.log(error)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: 'api/auth/refresh',
                method: 'GET'
            })
        })
    })
})

export const {
    useLoginMutation, 
    useSendLogoutMutation, 
    useRefreshMutation
} = authApiSlice