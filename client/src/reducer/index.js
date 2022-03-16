
import {GET_ALLGAMES, GET_GENRES,GET_GAMEBYID,GET_PLATFORMS,FILTER_GAMES,FILTER_GENRES,FILTER_ORDER,ONSEARCH,FILTER_RATING} from '../actions/actions_types'

const inicialState = {
    totalVideogames:[],
    existed:[],
    created:[],
    allVideoGames:[],
    searchedVideogames:[],
    genres:[],
    gameById:[],
    platforms:[],
    arrayFill:[],
    filterGames: "all",
    filterGenres: "all",
    filterOrder:"all",
    filterRating:"all"
}

export default function reducer(state = inicialState,action){

    switch(action.type){

        case GET_ALLGAMES:

            var totalVideoGames = [];
            action.payload.allGames?.map(vg => totalVideoGames.push(vg))
            action.payload.responseDB?.map(vg => totalVideoGames.unshift(vg))
            return {
                ...state,
                allVideoGames: action.payload,
                totalVideogames: totalVideoGames,
                existed: action.payload.allGames,
                created: action.payload.responseDB,
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

        case FILTER_GAMES:
                if(action.payload === "created" && state.filterGenres !="all"){
                    return {
                        ...state,
                        filterGames: action.payload,
                        arrayFill: state.created.filter(vg => (vg.Genres.find((g)=> g.name === state.filterGenres)))
                    }
                }
                  return{
                        ...state,
                        filterGames: action.payload
                    }
     
        case FILTER_GENRES:

            if((action.payload != "all") && (state.filterGames=== "all")){
                return{
                    ...state,
                    filterGenres: action.payload,
                    arrayFill: state.totalVideogames?.filter((vg) => {
                        return (vg.Genres ? (vg.Genres?.find((g)=> g.name === action.payload)) : (vg.genres?.includes(action.payload)))
                    })
                }
            }else if((action.payload != "all") && (state.filterGames=== "created")){
                return{
                    ...state,
                    filterGenres: action.payload,
                    arrayFill: state.created.filter(vg => (vg.Genres.find((g)=> g.name === action.payload)))
                }
            }else if((action.payload != "all") && (state.filterGames=== "existed")){
                return{
                    ...state,
                    filterGenres: action.payload,
                    arrayFill: state.existed.filter((vg) => vg.genres.includes(action.payload))
                }
            }else {
                return{
                    ...state,
                    filterGenres: action.payload
                }
            }

        case FILTER_ORDER:
            if((action.payload === "asc") && (state.filterGames=== "all") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
                    return 0;
                }
                return {//Si se quiere ordenar ascendentemente en todos mis juegos y hay un filtro de generos activado 
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "all") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {return 1;}
                    if (b.name.toLowerCase() < a.name.toLowerCase()) {return -1;}
                    return 0;
                }
                return {//Si se quiere ordenar descendentemente en todos los juegos y hay un filtro de generos activado 
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "existed") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
                    return 0;
                }
                return {//Si se quiere ordenar ascendentemente en los juegos existentes y hay un filtro de generos activado 
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "existed") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {return 1;}
                    if (b.name.toLowerCase() < a.name.toLowerCase()) {return -1;}
                    return 0;
                }
                return {//Si se quiere ordenar descendentemente en los juegos existentes y hay un filtro de generos activado 
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "created") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
                    return 0;
                }
                return {//Si se quiere ordenar ascendentemente en los juegos creados y hay un filtro de generos activado 
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "created") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {return 1;}
                    if (b.name.toLowerCase() < a.name.toLowerCase()) {return -1;}
                    return 0;
                }
                return {//Si se quiere ordenar descendentemente en los juegos creados y hay un filtro de generos activado 
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "all") && (state.filterGenres ==="all")){
                var ordenado = state.totalVideogames.map((vg) => vg)
                function SortArray(a, b){
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
                    return 0;
                }
                return { //Si quiero ordenar ascendentemente en todos los juegos sin haber ningun genero cargado
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "all") && (state.filterGenres ==="all")){
                var ordenado = state.totalVideogames.map((vg) => vg)
                function SortArray(a, b){
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {return 1;}
                    if (b.name.toLowerCase() < a.name.toLowerCase()) {return -1;}
                    return 0;
                }
                return {//Si quiero ordenar descendentemente en todos los juegos sin haber ningun genero cargado
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "existed") && (state.filterGenres ==="all")){
                var ordenado = state.existed.map((vg) => vg)
                function SortArray(a, b){
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
                    return 0;
                }
                return {//Si quiero ordenar ascendentemente en los juegos existentes sin haber ningun genero cargado
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "existed")  && (state.filterGenres ==="all")){
                var ordenado = state.existed.map((vg) => vg)
                function SortArray(a, b){
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {return 1;}
                    if (b.name.toLowerCase() < a.name.toLowerCase()) {return -1;}
                    return 0;
                }
                return {//Si quiero ordenar descendentemente en los juegos existentes sin haber ningun genero cargado
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "created")  && (state.filterGenres ==="all")){
                var ordenado = state.created.map((vg) => vg)
                function SortArray(a, b){
                    if (a.name.toLowerCase() < b.name.toLowerCase()) {return -1;}
                    if (a.name.toLowerCase() > b.name.toLowerCase()) {return 1;}
                    return 0;
                }//Si quiero ordenar ascendentemente en los juegos creados sin haber ningun genero cargado
                return {
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "created")  && (state.filterGenres ==="all")){
                var ordenado = state.created.map((vg) => vg)
                function SortArray(a, b){
                    if (b.name.toLowerCase() > a.name.toLowerCase()) {return 1;}
                    if (b.name.toLowerCase() < a.name.toLowerCase()) {return -1;}
                    return 0;
                }//Si quiero ordenar descendentemente en los juegos creados sin haber ningun genero cargado
                return {
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "all") && (state.filterGames=== "all") && (state.filterGenres !="all")){
                return {
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: state.totalVideogames?.filter((vg) => {
                        return (vg.Genres ? (vg.Genres?.find((g)=> g.name === state.filterGenres)) : (vg.genres?.includes(state.filterGenres)))})
                }//Caso default 
            }else if((action.payload === "all") && (state.filterGames=== "created") && (state.filterGenres !="all")){
                return {
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: state.created.filter(vg => (vg.Genres.find((g)=> g.name === state.filterGenres)))
                }//Caso default 
            }else if((action.payload === "all") && (state.filterGames=== "existed") && (state.filterGenres !="all")){
                return {
                    ...state,
                    filterOrder: action.payload,
                    arrayFill: state.existed.filter(vg => (vg.genres.find((g)=> g === state.filterGenres)))
                }//Caso default 
            }else {
                return {
                    ...state,
                    filterOrder: action.payload
                }
            }
                
            

        case ONSEARCH:
                return {
                    ...state,
                    searchedVideogames: action.payload
                }
            
        case FILTER_RATING:
            if((action.payload === "asc") && (state.filterGames=== "all") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(a.rating) < Number(b.rating)) {return -1;}
                    if (Number(a.rating) > Number(b.rating)) {return 1;}
                    return 0;
                }
                return {//Si se quiere ordenar ascendentemente en todos mis juegos y hay un filtro de generos activado 
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "all") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(b.rating) > Number(a.rating)) {return 1;}
                    if (Number(b.rating) < Number(a.rating)) {return -1;}
                    return 0;
                }
                return {//Si se quiere ordenar descendentemente en todos los juegos y hay un filtro de generos activado 
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "existed") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(a.rating) < Number(b.rating)) {return -1;}
                    if (Number(a.rating) > Number(b.rating)) {return 1;}
                    return 0;
                }
                return {//Si se quiere ordenar ascendentemente en los juegos existentes y hay un filtro de generos activado 
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "existed") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(b.rating) > Number(a.rating)) {return 1;}
                    if (Number(b.rating) < Number(a.rating)) {return -1;}
                    return 0;
                }
                return {//Si se quiere ordenar descendentemente en los juegos existentes y hay un filtro de generos activado 
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "created") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(a.rating) < Number(b.rating)) {return -1;}
                    if (Number(a.rating) > Number(b.rating)) {return 1;}
                    return 0;
                }
                return {//Si se quiere ordenar ascendentemente en los juegos creados y hay un filtro de generos activado 
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "created") && (state.filterGenres !="all")){
                var ordenado = state.arrayFill.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(b.rating) > Number(a.rating)) {return 1;}
                    if (Number(b.rating) < Number(a.rating)) {return -1;}
                    return 0;
                }
                return {//Si se quiere ordenar descendentemente en los juegos creados y hay un filtro de generos activado 
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "all") && (state.filterGenres ==="all")){
                var ordenado = state.totalVideogames.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(a.rating) < Number(b.rating)) {return -1;}
                    if (Number(a.rating) > Number(b.rating)) {return 1;}
                    return 0;
                }
                return { //Si quiero ordenar ascendentemente en todos los juegos sin haber ningun genero cargado
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "all") && (state.filterGenres ==="all")){
                var ordenado = state.totalVideogames.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(b.rating) > Number(a.rating)) {return 1;}
                    if (Number(b.rating) < Number(a.rating)) {return -1;}
                    return 0;
                }
                return {//Si quiero ordenar descendentemente en todos los juegos sin haber ningun genero cargado
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "existed") && (state.filterGenres ==="all")){
                var ordenado = state.existed.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(a.rating) < Number(b.rating)) {return -1;}
                    if (Number(a.rating) > Number(b.rating)) {return 1;}
                    return 0;
                }
                return {//Si quiero ordenar ascendentemente en los juegos existentes sin haber ningun genero cargado
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "existed")  && (state.filterGenres ==="all")){
                var ordenado = state.existed.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(b.rating) > Number(a.rating)) {return 1;}
                    if (Number(b.rating) < Number(a.rating)) {return -1;}
                    return 0;
                }
                return {//Si quiero ordenar descendentemente en los juegos existentes sin haber ningun genero cargado
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "asc") && (state.filterGames=== "created")  && (state.filterGenres ==="all")){
                var ordenado = state.created.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(a.rating) < Number(b.rating)) {return -1;}
                    if (Number(a.rating) > Number(b.rating)) {return 1;}
                    return 0;
                }//Si quiero ordenar ascendentemente en los juegos creados sin haber ningun genero cargado
                return {
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "desc") && (state.filterGames=== "created")  && (state.filterGenres ==="all")){
                var ordenado = state.created.map((vg) => vg)
                function SortArray(a, b){
                    if (Number(b.rating) > Number(a.rating)) {return 1;}
                    if (Number(b.rating) < Number(a.rating)) {return -1;}
                    return 0;
                }//Si quiero ordenar descendentemente en los juegos creados sin haber ningun genero cargado
                return {
                    ...state,
                    filterRating: action.payload,
                    arrayFill: ordenado.sort(SortArray)
                }
            }else if((action.payload === "all") && (state.filterGames=== "all") && (state.filterGenres !="all")){
                return {
                    ...state,
                    filterRating: action.payload,
                    arrayFill: state.totalVideogames?.filter((vg) => {
                        return (vg.Genres ? (vg.Genres?.find((g)=> g.name === state.filterGenres)) : (vg.genres?.includes(state.filterGenres)))})
                }//Caso default 
            }else if((action.payload === "all") && (state.filterGames=== "created") && (state.filterGenres !="all")){
                return {
                    ...state,
                    filterRating: action.payload,
                    arrayFill: state.created.filter(vg => (vg.Genres.find((g)=> g.name === state.filterGenres)))
                }//Caso default 
            }else if((action.payload === "all") && (state.filterGames=== "existed") && (state.filterGenres !="all")){
                return {
                    ...state,
                    filterRating: action.payload,
                    arrayFill: state.existed.filter(vg => (vg.genres.find((g)=> g === state.filterGenres)))
                }//Caso default 
            }else {
                return {
                    ...state,
                    filterRating: action.payload
                }
            }

            default:
                return state
    }
}
