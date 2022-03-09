import axios from 'axios'
import {GET_ALLGAMES, GET_GENRES , GET_GAMEBYID,GET_PLATFORMS} from './actions_types'

export function getVideogames(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/videogames')
        return dispatch({
            type: GET_ALLGAMES,
            payload: json.data
        })
    }
}

export function getGenres(){
    return async function(dispatch){
        const json = await axios.get('http://localhost:3001/genres')
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export function getGameById(id){
   return async function(dispatch){
       const json = await axios.get(`http://localhost:3001/videogames/${id}`)
       return dispatch({
           type: GET_GAMEBYID,
           payload: json.data
       })
   }
    
}

export function getPlatforms(){
return async function (dispatch){
    const json = await axios.get(`http://localhost:3001/platforms`)
    return dispatch({
        type: GET_PLATFORMS,
        payload: json.data
    })
}

}