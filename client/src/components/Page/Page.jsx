import React from 'react'
import { useSelector } from 'react-redux';
import styles from './Page.module.css';

function Page({allVideoGames,paginate,videogamesPerPage}) {
 const filterGenres = useSelector((state) => state.filterGenres)

    const pageNumbers =[];


    for(let i=0;i<Math.ceil(allVideoGames/videogamesPerPage);i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav className={styles.nav}>
                {
                    pageNumbers.map((number)=> {
                        return <ul className={styles.ul} key={number}>
                          <a onClick={()=> paginate(number)} key={number} className={styles.a}>
                            {number}
                            </a>
                        </ul>
                    })
                }

        </nav>


    )
}

export default Page