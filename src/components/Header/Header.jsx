import React from 'react'
import "./Header.css";
import Navbar from '../Navbar/Navbar';


export default function Header() {
  return (
    <header className='header'>
      <div className="car-logo">
        <h1>
          cars
        </h1>
      </div>
      <Navbar/>
      
      <div className='profileIcon'>
        <img src="../public/profile-icon.png" alt="profile icon" />
      </div>
    </header>
  )
}
