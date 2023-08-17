import React from 'react'
import { useGetUsersQuery } from './usersApiSlice'
import User from './User'

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess, 
    isError,
    error
  } = useGetUsersQuery(undefined, {
    pollingInterval: 60000, // fetch every minute
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
    const { ids } = users
    const tableContent = ids?.length
    ? ids.map(userId => <User key={userId} userId={userId} />)
    : null

    content = (
      <table className='table table--users'>
        <thead className='table__head'>
          <tr>
            <th scope='col' className='table__th user__username'>Username</th>
            <th scope='col' className='table__th user__roles'>Roles</th>
            <th scope='col' className='table__th user__edit'>Edit</th>
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

export default UsersList