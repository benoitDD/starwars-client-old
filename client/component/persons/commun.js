import gql from 'graphql-tag'
import {ONLY_FIRST_IMAGE} from '../commun/utilsImages'

const FRAGMENT_PERSON = gql`
    fragment PersonFragment on Person {
        id
        name
        birthYear
        eyeColor
        gender
        hairColor
        height
        mass
        skinColor
        homeworld{
            id
            name
            planetMore{
                ${ONLY_FIRST_IMAGE}
            }
        },
        species{
            id
            name
            speciesMore{
                ${ONLY_FIRST_IMAGE}
            }
        }
        personMore{
            imagesHeader {
                _id
                filename
                title
                description
            }
        }
        starships{
            starships{
                id
                name
                starshipMore{
                    ${ONLY_FIRST_IMAGE}
                }
            }
        }
        vehicles{
            vehicles{
                id
                name
                vehicleMore{
                    ${ONLY_FIRST_IMAGE}
                }
            }
        }
    }
`

const GET_PERSON = gql`
query Person($id:ID!){
    person(id:$id){
        ...PersonFragment
    }
}
${FRAGMENT_PERSON}
`

function getProperties(person){
    return [
        {
            label: 'Birth year',
            value: person.birthYear
        },
        {
            label: 'Eye color',
            value: person.eyeColor
        },
        {
            label: 'Gender',
            value: person.gender
        },
        {
            label: 'Hair color',
            value: person.hairColor
        },
        {
            label: 'Height',
            value: person.height,
            unit: 'cm'
        },
        {
            label: 'Mass',
            value: person.mass,
            unit: 'kg'
        },
        {
            label: 'Skin color',
            value: person.skinColor
        }
    ]
}

export {FRAGMENT_PERSON, GET_PERSON, getProperties}