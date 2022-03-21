import React from 'react';

export default function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = 'Es necesario un nombre';
    }
    if(input.name.length > 100){
      errors.name = 'El nombre no puede pasar de 100 caracteres';
    }
    if(input.name && input.name.trim().length === 0){
      errors.name = 'El nombre no puede estar vacio';
    } 
    
    if (!input.description) {
        errors.description = 'Es necesaria una descripcion';
      }
      if(input.description && input.description.trim().length === 0){
        errors.description = 'La descripcion no puede estar vacia';
      } 
    
    if (input.released &&!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(input.released)) {
        errors.released = 'Fecha de lanzamiento es invalida';
    }


    if(input.rating && !/[+]?([0-4]*\.[0-9]+|[0-5])/.test(input.rating)){
        errors.rating = 'Valor de Rating invalido';
        //Verifica si el rating no es negativo, esta en un rango del 1 al 10 y no tiene mas de un decimal
    }
  
    return errors;
  };