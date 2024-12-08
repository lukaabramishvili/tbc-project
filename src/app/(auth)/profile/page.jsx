//                                                                პირველი  ვარიანტი 11111111111111111111111111111111111111

// 'use client';

// import React, { useEffect, useState } from 'react';
// import './index.css';
// import Link from 'next/link';
// import HeaderLoggedIn from '../../components/Header/HeaderLoggedIn';
// import Loading from '../../../../public/loading.png';
// import Image from 'next/image';
// import { getSession } from '@auth0/nextjs-auth0';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const session = await getSession();
//         console.log('Session:', session);

//         if (session && session.user) {
//           setUser(session.user);
//         } else {
//           console.warn('No user data found in session.');
//         }
//       } catch (error) {
//         console.error('Error fetching session:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <main id="prof" className='flex items-center justify-center gap-y-7 my-40'>
//         <div className="border-4 border-gray-800 border-t-[#BAB9B9] rounded-full animate-spin flex justify-center items-center">
//           <Image
//             src={Loading.src}
//             width={100}
//             height={100}
//             alt="Loading spinner"
//             className='w-16 h-16'
//           />
//         </div>
//         <h1 className='text-2xl text-gray-700'>Loading...</h1>
//       </main>
//     );
//   }

//   if (!user) {
//     return <p className='text-center text-red-500'>User not found or not authenticated.</p>;
//   }

//   return (
//     <div className='p-4'>
//       <h2 className='text-2xl font-bold'>Profile</h2>
//       <div className='mt-2'>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Username:</strong> {user.username || 'Username not available'}</p>
//       </div>
//     </div>
//   );
// };

// export default Profile;




//                                                                        მეორე ვარიანტი 22222222222222222222222222


// 'use client';

// import React, { useEffect, useState } from 'react';
// import './index.css';
// import Link from 'next/link';
// import HeaderLoggedIn from '../../components/Header/HeaderLoggedIn';
// import Loading from '../../../../public/loading.png'
// import Image from 'next/image';
// import { getSession } from 'next-auth/react';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const session = await getSession();
//       console.log(session);
      
//       const user = session?.user
//       console.log(user);


//       setUser(user);
//       setLoading(false);
//     };

//     fetchUserData();
//   }, []);


//   if (loading) {
//     return (
//       <main id="prof" className='flex items-center justify-center gap-y-7 my-40'>
//         <div className="border-4 border-gray-800 border-t-[#BAB9B9] rounded-full  animate-spin flex justify-center items-center">
//           <Image
//             src={Loading.src}
//             width={100}
//             height={100}
//             className='w-16 h-16'
//           />
//         </div>
//         <h1 className='text-2xl text-gray-700'>Loading...</h1>
//       </main>
//     );
//   }
//   if (!user) {
//     return <p>User not found or not authenticated.</p>;
//   }

//   return  (
//     <div>
//       <div>{user.email}</div>
//       <div>{user.username}</div>
//     </div>
//   )
// }

// export default Profile;


// const session = await getSession();
// const user = session?.user

//                                                              მესამე ვარიანტი  33333333333333333333333333333


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getCurrentAuthUser } from '../../services/authService';
// import './index.css';
// import Link from 'next/link';
// import HeaderLoggedIn from '../../components/Header/HeaderLoggedIn';
// import Loading from '../../../../public/loading.png'
// import Image from 'next/image';

// const Profile = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const userData = await getCurrentAuthUser();
//       setUser(userData);
//       setLoading(false);
//     };

//     fetchUserData();
//   }, []);

//   if (loading) {
//     return (
//       <main id="prof" className='flex items-center justify-center gap-y-7 my-40'>
//         <div className="border-4 border-gray-800 border-t-[#BAB9B9] rounded-full  animate-spin flex justify-center items-center">
//           <Image
//             src={Loading.src}
//             width={100}
//             height={100}
//             className='w-16 h-16'
//           />
//         </div>
//         <h1 className='text-2xl text-gray-700'>Loading...</h1>
//       </main>
//     );
//   }

//   if (!user) {
//     return <p>User not found or not authenticated.</p>;
//   }

//   return (
//     <main id="profile-page" className='p-12'>
//       <div className="prof-header-cont flex items-center justify-center mb-12">
//         <div className="profile-header flex items-center justify-center gap-3 bg-profileSecondaryColor w-fit px-6 rounded-lg shadow-custom shadow-profileAccent">
//           {user.image && (
//             <img 
//               src={user.image} 
//               alt="User Profile Avatar"
//               width={72}
//               height={72}
//             />
//           )}
//           <div className="header-text flex items-center flex-col text-profileAccent">
//             <p className="F-name text-4xl">{user.firstName}</p>
//             <p className="L-name text-2xl">{user.lastName}</p>
//           </div>
//         </div>
//       </div>
//       <div className="grid-cont grid grid-cols-2 gap-6 justify-items-center mb-12">
//         <div className="grid-item">
//           <h6>{user.username}</h6>
//           <p className="age">
//             <span>Age:</span> {user.age}{' '}
//           </p>
//           <p className="address">
//             <span>Address: </span>
//             {user.address.country}/{user.address.address}
//           </p>
//         </div>
//         <div className="education  grid-item">
//           <h6>Education</h6>
//           <p className="uni">{user.university}</p>
//         </div>
//         <div className="workplace  grid-item">
//           <h6>Workplace</h6>
//           <p className="company">{user.company.name} </p>
//           <p className="comp-title">{user.company.title}</p>
//         </div>
//         <div className="contacts  grid-item">
//           <h6>Contact info</h6>
//           <p className="mail flex gap-1">
//             <span>mail:</span>
//             <Link href={`mailto:${user.email}`}>{user.email}</Link>
//           </p>
//           <p className="phone flex gap-1">
//             <span>phone:</span>
//             <Link href={`tel:${user.phone}`}>{user.phone}</Link>
//           </p>
//         </div>
//         <div className="payment-info flex flex-col bg-profileSecondaryColor p-6 rounded-lg gap-4 mt-6 shadow-custom shadow-profileAccent">
//           <h6 className="payment-title text-2xl border-b-2 border-profileAccent pb-2 text-profileAccent">Payment Information</h6>
//           <div className="payment-types flex items-center justify-center gap-5">
//             <div className="cards p-5 rounded-lg bg-profileAccent w-full text-profileSecondaryColor">
//               <h5 className='text-profileSecondaryColor text-[18px] border-b border-profileSecondaryColor pb-2 mb-3'>Banking Cards</h5>
//               <p>
//                 <span className='text-white'>{user.bank.cardType}:</span>{' '}
//                 {' ' + '**** ****' + ' ' + user.bank.cardNumber.slice(-4)}
//               </p>
//             </div>
//             <div className="wallets p-5 rounded-lg bg-profileAccent w-full text-profileSecondaryColor">
//               <h5 className='text-profileSecondaryColor text-[18px] border-b border-profileSecondaryColor pb-2 mb-3'>Crypto Wallets</h5>
//               <p>
//                 <span className='text-white'>{user.crypto.coin}:</span>{' '}
//                 {user.crypto.wallet.slice(0, 4) +
//                   ' ' +
//                   '**** ****' +
//                   ' ' +
//                   user.crypto.wallet.slice(-4)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Profile;




//                                                         მეოთხე ვარიანტი


import { UserProvider } from "@auth0/nextjs-auth0/client";
import User from "../../user/page";

const Profile = () => {

  return (
    <UserProvider>
      <User/>
    </UserProvider>
  );
};

export default Profile;