import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'localhost:5000' }),
    tagTypes: ['Note', 'User'],
    endpoints: builder => ({})
})