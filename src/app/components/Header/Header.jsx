import React from 'react'
import "./Header.css";
import Navbar from '../Navbar/Navbar';
import Link from 'next/link';
import profilImage from "../../../../public/profile-icon.png"
import HeaderLoggedIn from '../Header/HeaderLoggedIn';


export default function Header() {
  return (
    <header className='header'>
      <div className="car-logo">
        <Link href="/"><h1>tbc</h1></Link>
      </div>
      <Navbar/>
      <HeaderLoggedIn/>
      <div className='profileIcon'>
        <Link href="/profile">
          <img src={profilImage.src} alt="profile icon" />
        </Link>          
      </div>
    </header>
  )
}
