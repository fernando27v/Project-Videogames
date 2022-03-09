import React from 'react'
import {Link} from 'react-router-dom'
import styles from './LandingPage.module.css'
function LandingPage() {
  return (
    <div className={styles.Page}>
        <h1 className={styles.Text}>Project Videogames</h1>
        <Link to='/home'><button className={styles.Button}>PRESS START</button></Link>
    </div>
  )
}

export default LandingPage