import gql from 'graphql-tag'

const FRAGMENT_SPECIES = gql`
fragment SpeciesFragment on Species {
    id
    name
    classification
    designation
    averageHeight
    averageLifespan
    eyeColors
    hairColors
    skinColors
    language
    homeworld{
        id
        name
        planetMore{
            imagesHeader(first:true) {
                filename
                title
                description
            }
        }
    } 
    speciesMore{
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

const GET_SPECIES = gql`
query Species($id:ID!){
    species(id:$id){
        ...SpeciesFragment
    }
}

${FRAGMENT_SPECIES}
`

function getProperties(species){
    return [
        {
            label: 'Classification',
            value: species.classification
        },
        {
            label: 'Designation',
            value: species.designation
        },
        {
            label: 'Average height',
            value: species.averageHeight,
            unit: 'cm'
        },
        {
            label: 'Average life span',
            value: species.averageLifespan,
            unit: 'y'
        },
        {
            label: 'Eye colors',
            value: species.eyeColors
        },
        {
            label: 'Hair colors',
            value: species.hairColors
        },
        {
            label: 'Skin colors',
            value: species.skinColors
        },
        {
            label: 'Language',
            value: species.language
        }
    ]
}

export {FRAGMENT_SPECIES, GET_SPECIES, getProperties}