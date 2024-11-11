import { getSession } from "@auth0/nextjs-auth0";

const UserServer = async () => {

    const session = await getSession();
    const user = session?.user;

    if (!user) {
        return null;
    }

  return user ? (
    <>
        <h1>welcome {user.name}!</h1>
        <h3>{user.email}</h3>
    </>
    
  ) : (
    <div>user not logged in</div>
  )
}

export default UserServer;