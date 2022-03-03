require('dotenv').config()
const { Router } = require('express');
const axios = require('axios')
// Importacion de todos los routers;
const genre = require('./genre')
const {API_KEY} = process.env;
const {getGames,getGamesById,postGames} = require('./videogames')
const {getGenre} = require('./genre')
const {getPlatform} = require('./platform')

const router = Router();

// Configurarion de routers

router.get('/videogames', getGames)
router.get('/videogames/:id', getGamesById)
router.post('/videogames',postGames)
router.get('/genres',getGenre)
router.get('/platforms',getPlatform)




module.exports = router;
