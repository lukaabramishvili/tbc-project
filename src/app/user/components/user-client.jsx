'use client'

import { useUser } from "@auth0/nextjs-auth0/client";

const UserClient = () => {

const {user, error, isLoading} = useUser();

if (isLoading) return <div>Loading...</div>
if (error) return <div>{error.message}</div>

  return user ? (
    <>
        <h1>welcome {user.name}!</h1>
        <h3>{user.email}</h3>
    </>
    
  ) : (
    <div>user not logged in</div>
  )
}

export default UserClient;