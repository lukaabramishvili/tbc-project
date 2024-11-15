import { useUserDataContext } from '../../providers/_app';

export default function HeaderLoggedIn() {
  const userData = useUserDataContext(); 

  if (!userData) {
    return null; 
  }

  return (
    <div className="p-3">
      <span className="text-white">{`Hello ${userData.email}!`}</span>
      <span className="block mt-2">
        <a href="/api/auth/logout">Logout</a> 
        Log Out
      </span>
    </div>
  );
}
