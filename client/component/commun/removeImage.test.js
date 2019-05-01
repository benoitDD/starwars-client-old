import RemoveImage from './removeImage'
import React from 'react'
import renderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import gql from 'graphql-tag'
import wait from 'waait'
import {RESPONSE_OBJECT, RESPONSE_OBJECT_FRAGMENTS} from './utils'

jest.mock('../../hoc/updateActive')

const REMOVE_IMAGE = gql`
  mutation RemoveImage($inputRemoveImage: InputRemoveImage!) {
    removeImage(inputRemoveImage: $inputRemoveImage){
      ${RESPONSE_OBJECT}
    }
  }

  ${RESPONSE_OBJECT_FRAGMENTS}
`
const idExternal = '1234'
const type = 'person'
const idImage = 'img1234'

const mocks = [
    {
        request: {
            query: REMOVE_IMAGE,
            variables: {
              inputRemoveImage: {
                idExternal,
                type,
                idImage
              },
            },
        },
        result: {
            data: {
              removeImage: {
                success: true,
                message: null,
                details: null,
                person: {
                  id: '789',
                  name: 'Luke Skywalker',
                  __typename: 'Person',
                  hairColor: null,
                  birthYear: null,
                  skinColor: null,
                  eyeColor: null,
                  gender: null,
                  height: null,
                  mass: null,
                  homeworld: null,
                  species: null,
                  personMore: null,
                  starships: null,
                  vehicles: null,
                },
                planet: null,
                species: null,
                starship: null,
                vehicle: null,
                __typename: 'ResponseObject'
              }
            }
        }
    }
]

test('Test RemoveImage',async (done) => {
    const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={true}>
            <RemoveImage idImage = {idImage} idExternal = {idExternal} type = {type}/>
        </MockedProvider>,
    )

    const button = component.root.findByType('span')
    button.props.onClick()

    await wait(0)
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    done()
})