
import { useUserDataContext } from '../../providers/UserDataProvider';

export default function HeaderLoggedIn() {
  const userData = useUserDataContext();

  function handleLogout() {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;';
    window.location.href = '/login';
  }

  if (!userData) {
    return null;
  }

  return (
    <div className=" p-3">
      <span className="text-white">{`Hello ${userData.firstName}!`}</span>
      <span className="block mt-2">
        <button 
          className="w-full py-1 bg-green-600 border-none rounded text-white text-lg cursor-pointer hover:bg-green-500"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </span>
    </div>
  );
}
