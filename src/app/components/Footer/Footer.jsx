import React from 'react'
import "./Footer.css"
import Navbar from '../Navbar/Navbar';
import facebookIcon from '../../../../public/facebook.png';
import instagramIcon from '../../../../public/instagram.png'
import twitterIcon from '../../../../public/twitter.png'


export default function Footer() {
  return (
    <footer className='dark:bg-black bg-silver pt-4 flex justify-around'> 
      <div className="footerContext dark:text-white">
          <h3 className='uppercase  text-2xl mb-4 text-center'>contact us</h3>
          <p className='p-2'>Email: info@gmail.com</p>
      </div>
      <div className="footerContext dark:text-white">
          <h3 className='uppercase text-2xl mb-4 text-center'>navigation</h3>
          <ul className='navList'>
              <Navbar/>
          </ul>
      </div>
      <div className="footerContext dark:text-white">
          <h3 className='uppercase text-2xl mb-4 text-center'>follow us</h3>
          <ul className='social-networks flex gap-6'>
              <li className='dark:bg-white w-6 h-6 flex items-center justify-center'>
                  <a href="#">
                      <img src={facebookIcon.src} alt="facebook" />
                  </a>
              </li>
              <li className='dark:bg-white w-6 h-6 flex items-center justify-center'>
                  <a href="#">
                      <img src={instagramIcon.src} alt="instagram" />
                  </a>
              </li>
              <li className='dark:bg-white w-6 h-6 flex items-center justify-center'>
                  <a href="#">
                      <img src={twitterIcon.src} alt="twitter" />
                  </a>
              </li>
          </ul>
      </div>
    </footer>  
  )
}
