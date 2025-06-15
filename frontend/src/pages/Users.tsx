import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUsers, addUser } from '../services/userService'
import type { AxiosResponse } from 'axios'

interface User {
  full_name: string
  email: string
  role: string
  mrf_id: string
}

export default function Users() {
  const queryClient = useQueryClient()

  const { data: users, isLoading, isError } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: getUsers
  })

  const mutation = useMutation<AxiosResponse, Error, User>({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })

  const handleAddUser = () => {
    // In a real app, open a modal or form to add a new user. For now, simulate a dummy add.
    mutation.mutate({ full_name: 'New User', email: 'new@example.com', role: 'operator', mrf_id: 'MRF001' })
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">User List</h2>
          <button className="btn btn-primary" onClick={handleAddUser} disabled={mutation.isPending}>Add User</button>
        </div>
        {isLoading ? (
          <p>Loading…</p>
        ) : isError ? (
          <p className="text-red-500">Error loading users.</p>
        ) : !users ? (
          <p className="text-gray-500">No users found.</p>
        ) : users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4">MRF ID</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User, idx: number) => (
                  <tr key={idx} className="border-t">
                    <td className="py-2 px-4">{user.full_name}</td>
                    <td className="py-2 px-4">{user.email}</td>
                    <td className="py-2 px-4">{user.role}</td>
                    <td className="py-2 px-4">{user.mrf_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
} 