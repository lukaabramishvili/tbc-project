import React from 'react'
import "./Profile.css"

export default function Profile() {
  return (
    <div className="profileContainer">
    <div className="profileCard">
      <img 
        src="public\dinamo.jpg" 
        alt="Profile" 
        className="profilePicture"
      />
      <h1 className="profileName">Luka Abramishvili</h1>
      <p className="profileTitle">Frontend WEB Developer</p>
      <p className="profileBio">
        Passionate web developer with experience in building dynamic and responsive websites. Skilled in HTML, CSS, JavaScript, and React.
      </p>
      <div className="profileDetails">
        <p><strong>Email:</strong> Abramishvili.luka@tbcacademy.edu.ge</p>
        <p><strong>Phone:</strong> +995 555 12 13 14</p>
        <p><strong>Location:</strong> Georgia, Tbilisi</p>
      </div>
    </div>
  </div>  )
}
