import { createContext, useContext } from 'react';
import { getServerSession } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

const UserDataContext = createContext();

export const useUserDataContext = () => useContext(UserDataContext);

export default function MyApp({ Component, pageProps, userData }) {
  return (
    <SessionProvider session={pageProps.session}>
      <UserDataContext.Provider value={userData}>
        <Component {...pageProps} />
      </UserDataContext.Provider>
    </SessionProvider>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context);
  const userData = session?.user || null;

  return {
    props: {
      userData,
      session,  
    },
  };
}
