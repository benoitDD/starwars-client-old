import gql from 'graphql-tag'

const FRAGMENT_STARSHIP = gql`
fragment StarshipFragment on Starship {
    id
    name
    model
    starshipClass
    manufacturers
    costInCredits
    length
    crew
    passengers
    maxAtmospheringSpeed
    hyperdriveRating
    MGLT
    cargoCapacity
    consumables
    starshipMore{
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
const GET_STARSHIP = gql`
query Starship($id:ID!){
    starship(id:$id){
        ...StarshipFragment
    }
}

${FRAGMENT_STARSHIP}
`

function getProperties(starship){
    return [
        {
            label: 'Model',
            value: starship.model
        },
        {
            label: 'Starship class',
            value: starship.starshipClass
        },
        {
            label: 'Manufacturers',
            value: starship.manufacturers
        },
        {
            label: 'Cost in credits',
            value: starship.costInCredits,
            unit: 'credits'
        },
        {
            label: 'Length',
            value: starship.length,
            unit: 'm'
        },
        {
            label: 'Crew',
            value: starship.crew,
            helper: 'The number of personnel needed to run or pilot this starship'
        },
        {
            label: 'Passengers',
            value: starship.passengers,
            helper: 'The number of non-essentiel people this starship can transport'
        },
        {
            label: 'Max atmosphering speed',
            value: starship.maxAtmospheringSpeed,
            helper: 'The maximum speed of this starship in atmosphere'
        },
        {
            label: 'Hyperdrive rating',
            value: starship.hyperdriveRating,
            helper: 'The class of this starships hyperdrive'
        },
        {
            label: 'MGLT',
            value: starship.MGLT,
            helper: 'The Maximum number of Megalights this starship can travel in a standard hour'
        },
        {
            label: 'cargo capacity',
            value: starship.cargoCapacity,
            unit: 'kg'
        },
        {
            label: 'Consumables',
            value: starship.consumables,
            helper: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply'
        }
    ]
}

export {FRAGMENT_STARSHIP, GET_STARSHIP, getProperties}