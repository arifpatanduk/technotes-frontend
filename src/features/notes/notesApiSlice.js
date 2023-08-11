import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({})
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.query({
            query: () => '/api/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, // 5 seconds (default: 60 seconds)
            transformResponse: responseData => {
                const loadedNotes = responseData.map( note => {
                    note.id = note._id
                    return note
                })
                return notesAdapter.setAll(initialState, loadedNotes)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Note', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'Note', id}))
                    ]
                } else {
                    return [{type: 'Note', id: 'LIST'}]
                }
            }
        })
    })
})

export const {
    useGetNotesQuery
} = notesApiSlice

// return query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select()

// create memoized selector
const selectNotesData = createSelector(
    selectNotesResult,
    notesResult => notesResult.data // normalized state object with ids and entities
)

// getSelectors create these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllNotes,
    selectById: selectNoteById,
    selectIds: selectNoteIds
    // pass i a selector that returns the users slice of state
} = notesAdapter.getSelectors(state => selectNotesData(state) ?? initialState)