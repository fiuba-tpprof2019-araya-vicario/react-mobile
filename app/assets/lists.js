export const preguntas =  [{ id: 1, s: '¿Cual es el problema que tienes?'}, 
                  { id: 2, s: '¿Cual es la solución?'}, 
                  { id: 3, s: '¿A cuanta gente benefeciaria?'}, 
                  { id: 4, s: '¿Te gustaria trabajar para hacer realidad tu propuesta?'}, 
                  { id: 5, s: '¿Donde es el problema?'},
                  { id: 6, s: 'Distrito'},
                  { id: 7, s: 'Barrio'},
                  { id: 8, s: 'Parroquia'}
                  ];


export const categories = [ { id: 1, nombre: 'Infraestructura', icon: 'store', questions:[1,2,5,6] },
              { id: 2, nombre: 'Servicios Basicos', icon: 'flight-takeoff', questions:[1,4,6] },
              { id: 3, nombre: 'Servicios de Salud', icon: 'flight-takeoff', questions:[1,2,3,6]},
              { id: 4, nombre: 'Educación', icon: 'flight-takeoff', questions:[1,]},
              { id: 5, nombre: 'Cultura', icon: 'flight-takeoff', questions:[1,5,6]},
              { id: 6, nombre: 'Deportes', icon: 'flight-takeoff', questions:[1,2,3]},
              { id: 7, nombre: 'Otros', icon: 'flight-takeoff', questions:[1,2,3,4,5]} ];