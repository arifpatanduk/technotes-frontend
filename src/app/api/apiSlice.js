import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCredentials } from '../../features/auth/authSlice'


// set token to headers for every request
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, {getState}) => {
        const token = getState().auth.token

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})


// refresh token
const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log(args)
    console.log(api)
    console.log(extraOptions)

    let result = await baseQuery(args, api, extraOptions)

    // handle the status code
    if (result?.error?.status === 403) {
        console.log('sending refresh token')

        // send refresh token to get new access token
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions)
        
        if (refreshResult?.data) {
            // store new token
            api.dispatch(setCredentials({...refreshResult.data}))

            // retry originial query with new access token
            result = await baseQuery(args, api, extraOptions)
        } else {
            
            if (refreshResult?.error?.status === 403) {
                refreshResult.error.data.message = "Your login has expired"
            }

            return refreshResult
        }
    }

    return result
}


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})