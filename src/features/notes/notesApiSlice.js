import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
    // sort the list = open is first, following by completed
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})
const initialState = notesAdapter.getInitialState()

export const notesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({

        // get all notes
        getNotes: builder.query({
            query: () => '/notes',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // keepUnusedDataFor: 5, // 5 seconds (default: 60 seconds)
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
        }),

        // create new note
        addNewNote: builder.mutation({
            query: initialNote => ({
                url: '/notes',
                method: 'POST',
                body: {
                    ...initialNote
                }
            }),
            invalidatesTags: [
                { type: 'Note', id: 'LIST' }
            ]
        }),

        // update note
        updateNote: builder.mutation({
            query: initialNote => ({
                url: 'api/notes',
                method: 'PUT',
                body: {
                    ...initialNote
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),

        // delete note
        deleteNote: builder.mutation({
            query: ({ id }) => ({
                url: 'api/notes',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Note', id: arg.id }
            ]
        }),
    })
})

export const {
    // automatically generated by RTK Query from endpoint
    useGetNotesQuery,
    useAddNewNoteMutation,
    useUpdateNoteMutation,
    useDeleteNoteMutation
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