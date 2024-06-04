/*1. Pediremos las películas de Star Wars y pintaremos una gráfica de líneas en la que podamos ver cada una de las películas.
En el eje X el nombre de la película
En el eje Y año de publicación*/

const api1 = `https://swapi.dev/api/films/`
const api2 = `https://swapi.dev/api/people/`
const peliculas = []
const anios = []
const personajes = []
const arrayPersonajesPelis = []
const cantidadPelis = []

const getFromApi1 = async () => {
  try {

    const respuesta = await fetch(api1)
    const dato = await respuesta.json()
    const arrayPeliculas = dato.results
    return arrayPeliculas
  } catch (error) {
    console.log("Error")
  }

}
getFromApi1()
  .then(respuesta => {
    respuesta.forEach(element => {
      const titulo = element.title
      const anioPubli = element.release_date
      const stringAnio = new Date(anioPubli)
      const soloAnio = stringAnio.getFullYear()
      peliculas.push(titulo)
      anios.push(soloAnio)
    });
    new Chartist.Line('#chart1', {
      labels: peliculas,
      series: [
        anios,
      ]
    }, {
      high: anios[5],
      low: anios[0],
      fullWidth: true, chartPadding: {
        right: 100,
        left: 100,
        top: 20,
        bottom: 20
      },
      // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
      axisY: {
        onlyInteger: true,
        offset: 20
      }
    });
  })


//EJERCICIO 2

const getFromApi2 = async () => {
  try {

    const respuesta = await fetch(api2)
    const dato = await respuesta.json()
    const arrayPersonajes = dato.results
    return arrayPersonajes

  } catch (error) {
    console.log("Error")
  }

}
getFromApi2()
  .then(respuesta => {
    respuesta.forEach(element => {
      const names = element.name
      const films = element.films
      personajes.push(names)
      arrayPersonajesPelis.push(films.length)
      console.log(arrayPersonajesPelis)
    });
    var data = {
      labels: personajes,
      series: [
        arrayPersonajesPelis
      ]
    };

    var options = {
      seriesBarDistance: 10
    };

    var responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          },
          axisY: {
            onlyInteger: true,
            offset: 20
          }
        }
      }]
    ];

    new Chartist.Bar('#chart2', data, options, responsiveOptions);
    
  })

