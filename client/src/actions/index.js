import axios from 'axios'
import {GET_ALLGAMES, GET_GENRES , GET_GAMEBYID,
    GET_PLATFORMS,FILTER_GAMES,FILTER_GENRES,FILTER_ORDER,ONSEARCH, FILTER_RATING,DELETE_DETAIL,DELETE_SEARCHED} from './actions_types'

export function getVideogames(){
    return async function(dispatch){
        const json = await axios.get('/videogames')
        return dispatch({
            type: GET_ALLGAMES,
            payload: json.data
        })
    }
}

export function deleteDetail(){
    return {
        type: DELETE_DETAIL
    }
}

export function deleteSearched(){
    return {
        type: DELETE_SEARCHED
    }
}

export function getGenres(){
    return async function(dispatch){
        const json = await axios.get('/genres')
        return dispatch({
            type: GET_GENRES,
            payload: json.data
        })
    }
}

export function getGameById(id){
   return async function(dispatch){
       const json = await axios.get(`/videogames/${id}`)
       return dispatch({
           type: GET_GAMEBYID,
           payload: json.data
       })
   }
    
}

export function getPlatforms(){
return async function (dispatch){
    const json = await axios.get(`/platforms`)
    return dispatch({
        type: GET_PLATFORMS,
        payload: json.data
    })
}
}

export function setFilterGames(value){
    return {
        type: FILTER_GAMES,
        payload: value
    }
    
}

export function setFilterOrder(value){
    return {
        type: FILTER_ORDER,
        payload: value
    }
}

export function setFilterGenres(value){
    return {
        type: FILTER_GENRES,
        payload: value
    }
}

export function setFilterRating(value){
    return {
        type: FILTER_RATING,
        payload: value
    }
}

export function onSearch(value){
    return async function (dispatch){
        const json = await axios.get(`/videogames?name=${value}`)
        return dispatch({
            type: ONSEARCH,
            payload: json.data
        })
    }

}

