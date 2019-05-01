import Pagination from './pagination'
import React from 'react'
import renderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import gql from 'graphql-tag'
import wait from 'waait'

jest.mock('../../properties')

const GET_ALL_PERSONS = gql`
        query nameQuery($pageSize: Int, $after: String, $before: String){
            allPersons(pageSize: $pageSize, after: $after, before: $before){
                startCursor,
                endCursor,
                totalCount,
                persons {
                    id
                    name
                }
            }
        }
    `

const mocks = [
    {
        request: {
            query: GET_ALL_PERSONS,
            variables: {
                pageSize: 20,
            },
        },
        result: {
            data: {
                allPersons: {
                    startCursor: '1234',
                    endCursor: 'person3',
                    totalCount: 3,
                    persons: [
                        {
                            id: '1234',
                            name: 'Luke Skywalker' 
                        },
                        {
                            id: '456',
                            name: 'Anakin Skywalker' 
                        },
                        {
                            id: '789',
                            name: 'Sheev Palpatine' 
                        }
                    ]
                }
            }
        }
    }
]

test('Test Pagination',async (done) => {
    const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Pagination unique = 'persons' query = {GET_ALL_PERSONS} nameQuery = 'allPersons' nameObject = 'persons'>
                {
                    person => (
                        <a className = 'persons_item' href = {`/person/${person.id}`}>
                            {person.name}
                        </a>
                    )
                }
            </Pagination>
        </MockedProvider>,
    )

    await wait(0)
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    done()
})

test('Test Pagination loading',async (done) => {
    const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={false}>
            <Pagination unique = 'persons' query = {GET_ALL_PERSONS} nameQuery = 'allPersons' nameObject = 'persons'>
                {
                    person => (
                        <a className = 'persons_item' href = {`/person/${person.id}`}>
                            {person.name}
                        </a>
                    )
                }
            </Pagination>
        </MockedProvider>,
    )
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    done()
})