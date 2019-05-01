import {FRAGMENT_PERSON} from '../persons/commun'
import {FRAGMENT_PLANET} from '../planets/commun'
import {FRAGMENT_SPECIES} from '../species/commun'
import {FRAGMENT_STARSHIP} from '../starships/commun'
import {FRAGMENT_VEHICLE} from '../vehicles/commun'
import gql from 'graphql-tag'

const RESPONSE_OBJECT = `
    success
    message
    details{
    key
        message
    }
    person{
        ...PersonFragment
    }
    planet{
        ...PlanetFragment
    }
    species{
        ...SpeciesFragment
    }
    starship{
        ...StarshipFragment
    }
    vehicle{
        ...VehicleFragment
    }
`

const RESPONSE_OBJECT_FRAGMENTS = gql`
    ${FRAGMENT_PERSON}
    ${FRAGMENT_PLANET}
    ${FRAGMENT_SPECIES}
    ${FRAGMENT_STARSHIP}
    ${FRAGMENT_VEHICLE}
`


export {RESPONSE_OBJECT, RESPONSE_OBJECT_FRAGMENTS}