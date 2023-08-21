import { useGetNotesQuery } from './notesApiSlice'
import Note from './Note'

const NotesList = () => {
  const {
    data: notes,
    isLoading,
    isSuccess, 
    isError,
    error
  } = useGetNotesQuery('noteList', {
    pollingInterval: 15000, // fetch every 15 seconds
    refetchOnFocus: true, // fetch on focus
    refetchOnMountOrArgChange: true
  })

  let content

  // loading state
  if (isLoading) content = <p>Loading...</p>

  // if error
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  // if success
  if (isSuccess) {
    const { ids } = notes
    const tableContent = ids?.length
    ? ids.map(noteId => <Note key={noteId} noteId={noteId} />)
    : null

    content = (
      <table className='table table--notes'>
        <thead className="table__thead">
            <tr>
                <th scope="col" className="table__th note__status">Status</th>
                <th scope="col" className="table__th note__created">Created</th>
                <th scope="col" className="table__th note__updated">Updated</th>
                <th scope="col" className="table__th note__title">Title</th>
                <th scope="col" className="table__th note__username">Owner</th>
                <th scope="col" className="table__th note__edit">Edit</th>
            </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>

      </table>
    )
  }


  return content
}

export default NotesList