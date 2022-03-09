import {GET_ALLGAMES, GET_GENRES,GET_GAMEBYID,GET_PLATFORMS} from '../actions/actions_types'

const inicialState = {
    videogames: [],
    allVideoGames:[],
    genres:[],
    gameById:[],
    platforms:[]
}

export default function reducer(state = inicialState,action){

    switch(action.type){

        case GET_ALLGAMES:
            return {
                ...state,
                allVideoGames: action.payload
            }

        case GET_GENRES:
            return{
                ...state,
                genres:action.payload
            }

        case GET_GAMEBYID:
            return{
                ...state,
                gameById:action.payload
            }
        
            case GET_PLATFORMS:
                return {
                    ...state,
                    platforms:action.payload
                }

            default:
                return state
    }
}
