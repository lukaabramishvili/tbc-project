import { useUserDataContext } from './_app';

export default function Profile() {
  const userData = useUserDataContext();

  return (
    <div>
      {userData ? (
        <p>Welcome, {userData.name}!</p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}