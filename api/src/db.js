require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { strictEqual } = require('assert');
const axios = require('axios');
const {
  DB_USER, DB_PASSWORD, DB_HOST,API_KEY
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@:${DB_HOST}/videogames`, {
 // const sequelize = new Sequelize(`postgres://postgres:fercho3004@:5432/videogames`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  timestamps: false 
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Videogame ,Genre,Platform } = sequelize.models;

// Aca vendrian las relaciones

Videogame.belongsToMany(Genre, {through: 'Videogame_Genres'});
Genre.belongsToMany(Videogame, {through: 'Videogame_Genres'});
Videogame.belongsToMany(Platform, {through: 'Videogame_Platforms'});
Platform.belongsToMany(Videogame, {through: 'Videogame_Platforms'});

 //Sincronizacion de generos  y plataformas
(async ()=> {
 try{
   
  const response =await Promise.all([axios.get(`https://rawg.io/api/genres?key=${API_KEY}`),axios.get(`https://rawg.io/api/platforms?key=${API_KEY}`)])
  
    response[0].data.results.forEach(async (g) => {
    try{
      await Genre.create({id: g.id ,name: g.name})
    }catch(err){console.error(err)}}
    )
    response[1].data.results.forEach(async (p) => {
      try{
        await Platform.create({id: p.id ,name: p.name})
      }catch(err){console.error(err)}}
      )
    }catch(err){console.error(err)}

  try{
    await Promise.all([Genre.sync(),Platform.sync()])
  }catch(err){console.error(err)}
})();




// (async ()=>{
//   try{
//     await Videogame.sync({force:true})
//   }catch(err){
//     console.error(err)
//   }
//   })()






module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
