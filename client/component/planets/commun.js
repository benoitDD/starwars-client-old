import gql from 'graphql-tag'

const FRAGMENT_PLANET = gql`
fragment PlanetFragment on Planet {
    id
    name
    diameter
    rotationPeriod
    orbitalPeriod
    gravity
    population
    climates
    terrains
    surfaceWater
    planetMore{
        imagesHeader {
            _id
            filename
            title
            description
        }
    }
    persons{
        persons{
            id
            name
            personMore{
                imagesHeader(first:true) {
                    filename
                    title
                    description
                }
            }
        }
    }
}
`
const GET_PLANET = gql`
query Planet($id:ID!){
    planet(id:$id){
        ...PlanetFragment
    }
}

${FRAGMENT_PLANET}
`

function getProperties(planet){
    return [
        {
            label: 'Diameter',
            value: planet.diameter,
            unit: 'km'
        },
        {
            label: 'Rotation period',
            value: planet.rotationPeriod,
            unit: 'h'
        },
        {
            label: 'Orbital period',
            value: planet.orbitalPeriod,
            unit: 'd'
        },
        {
            label: 'Gravity',
            value: planet.gravity
        },
        {
            label: 'Population',
            value: planet.population,
            helper: 'The average population of sentient beings inhabiting this planet'
        },
        {
            label: 'Climates',
            value: planet.climates
        },
        {
            label: 'Terrains',
            value: planet.terrains
        },
        {
            label: 'Surface water',
            value: planet.surfaceWater,
            unit: '%'
        }
    ]
}

export {FRAGMENT_PLANET, GET_PLANET, getProperties}