import React from 'react'
import "./Footer.css"

export default function Footer() {
  return (
    <footer>
      <div className="footerContext">
          <h3>contact us</h3>
          <p>Email: info@gmail.com</p>
          <p>Phone: +995 555-11-11-11</p>
      </div>
      <div className="footerContext">
          <h3>navigation</h3>
          <ul className='navList'>
              <li>home</li>
              <li>shop</li>
              <li>dealers</li>
              <li>about us</li>
          </ul>
      </div>
      <div className="footerContext">
          <h3>follow us</h3>
          <ul className='social-networks'>
              <li>
                  <a href="#">
                      <img src="../public/facebook.png" alt="facebook" />
                  </a>
              </li>
              <li>
                  <a href="#">
                      <img src="../public/instagram.png" alt="instagram" />
                  </a>
              </li>
              <li>
                  <a href="#">
                      <img src="../public/twitter.png" alt="twitter" />
                  </a>
              </li>
          </ul>
      </div>
    </footer>  
  )
}
