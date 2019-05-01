import gql from 'graphql-tag'

const FRAGMENT_VEHICLE = gql`
fragment VehicleFragment on Vehicle {
    id
    name
    model
    vehicleClass
    manufacturers
    costInCredits
    length
    crew
    passengers
    maxAtmospheringSpeed
    cargoCapacity
    consumables
    vehicleMore{
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
const GET_VEHICLE = gql`
query Vehicle($id:ID!){
    vehicle(id:$id){
        ...VehicleFragment
    }
}

${FRAGMENT_VEHICLE}
`

function getProperties(vehicle){
    return [
        {
            label: 'Model',
            value: vehicle.model
        },
        {
            label: 'Vehicle class',
            value: vehicle.vehicleClass
        },
        {
            label: 'Manufacturers',
            value: vehicle.manufacturers
        },
        {
            label: 'Cost in credits',
            value: vehicle.costInCredits,
            unit: 'credits'
        },
        {
            label: 'Length',
            value: vehicle.length,
            unit: 'm'
        },
        {
            label: 'Crew',
            value: vehicle.crew,
            helper: 'The number of personnel needed to run or pilot this starship'
        },
        {
            label: 'Passengers',
            value: vehicle.passengers,
            helper: 'The number of non-essentiel people this starship can transport'
        },
        {
            label: 'Max atmosphering speed',
            value: vehicle.maxAtmospheringSpeed,
            helper: 'The maximum speed of this starship in atmosphere'
        },
        {
            label: 'Cargo capacity',
            value: vehicle.cargoCapacity,
            unit: 'kg'
        },
        {
            label: 'Consumables',
            value: vehicle.consumables,
            helper: 'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply'
        }
    ]
}

export {FRAGMENT_VEHICLE, GET_VEHICLE, getProperties}