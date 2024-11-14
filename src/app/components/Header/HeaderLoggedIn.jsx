import { useUserDataContext } from '../../providers/UserDataProvider';

export default async function HeaderLoggedIn() {
  const userData = useUserDataContext();


  if (!userData) {
    return null;
  }

  const session = await getSession();
  const user = session?.user;


  return (
    <div className=" p-3">
      <span className="text-white">{`Hello ${user.email}!`}</span>
      <span className="block mt-2">
      <a href="/api/auth/logout">Logout</a>
          Log Out
      </span>
    </div>
  );
}
