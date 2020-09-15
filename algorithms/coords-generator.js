import randomPointsOnPolygon from 'random-points-on-polygon'
import geocode from '~/static/geocode.json'

// Mainffuncion to generate array of Areas
export function generateCoords() {
  const areas = []

  createAreas(geocode, areas)
  randomizeNumberOfPoints(areas, 100)
  generatePoints(areas)

  return areas
}

// Creating object with name and feature from geocode and pushing it into array
function createAreas(geocode, array) {
  geocode.features.forEach((el) => {
    array.push({
      name: el.properties.ABBREV,
      feature: geocode.features[geocode.features.indexOf(el)],
      numberOfPoints: 0,
    })
  })
}

// Randomize number of points within each area
function randomizeNumberOfPoints(areas, totalPoints) {
  for (let i = 0; i < totalPoints; i++) {
    const randonNumber = Math.floor(Math.random() * 12)
    areas[randonNumber].numberOfPoints++
  }
}

// Generate points for each area
function generatePoints(areas) {
  areas.forEach((el) => {
    el.points = randomPointsOnPolygon(el.numberOfPoints, el.feature).map(
      (el) => el.geometry.coordinates
    )
  })
}
