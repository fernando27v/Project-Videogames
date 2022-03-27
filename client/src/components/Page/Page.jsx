import React from 'react'
import {NavLink} from 'react-router-dom'
import styles from './Page.module.css';

function Page({allVideoGames,paginate,videogamesPerPage}) {

    const pageNumbers =[];


    for(let i=0;i<Math.ceil(allVideoGames/videogamesPerPage);i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav className={styles.nav}>
                {
                    pageNumbers.map((number)=> {
                        return <ul className={styles.ul} key={number}>
                          <NavLink exact  to={`/home?page=${number}`}  onClick={()=> paginate(number)} className={styles.a} >{number}</NavLink>
                        </ul>
                    })
                }

        </nav>


    )
}

export default Page