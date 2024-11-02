import React from 'react'
import "./Header.css";
import Navbar from '../Navbar/Navbar';
import Link from 'next/link';
import profilImage from "../../../../public/profile-icon.png"
import HeaderLoggedIn from '../Header/HeaderLoggedIn';


export default function Header() {
  return (
    <header className='bg-silver max-w-full h-24 flex items-center justify-around'>
      <Link href="/"><h1 className='text-5xl uppercase cursor-pointer'>tbc</h1></Link>
      <Navbar/>
      <div className='profileIcon flex'>
        <Link href="/profile">
          <img className='max-h-20 cursor-pointer' src={profilImage.src} alt="profile icon" />
        </Link>          
        <HeaderLoggedIn/>
      </div>
    </header>
  )
}
