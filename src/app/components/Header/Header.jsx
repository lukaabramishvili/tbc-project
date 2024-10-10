import React from 'react'
import "./Header.css";
import Navbar from '../Navbar/Navbar';
import Link from 'next/link';



export default function Header() {
  return (
    <header className='header'>
      <div className="car-logo">
        <Link href="/"><h1>tbc</h1></Link>
      </div>
      <Navbar/>
      
      <div className='profileIcon'>
        <Link href="/profile">
          <img src="../public/profile-icon.png" alt="profile icon" />
        </Link>          
      </div>
    </header>
  )
}
