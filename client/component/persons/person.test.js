import Person from './person'
import React from 'react'
import renderer from 'react-test-renderer'
import {MockedProvider} from 'react-apollo/test-utils'
import wait from 'waait'
import {GET_PERSON} from './commun'

jest.mock('../../hoc/updateActive')

const mocks = [
    {
        request: {
            query: GET_PERSON,
            variables: {
                id: 'cGVvcGxlOjE='
            },
        },
        result: {
            data: {
                "person": {
                  "id": "cGVvcGxlOjE=",
                  "name": "Luke Skywalker",
                  "birthYear": "19BBY",
                  "eyeColor": "blue",
                  "gender": "male",
                  "hairColor": "blond",
                  "height": 172,
                  "mass": 77,
                  "skinColor": "fair",
                  "homeworld": {
                    "id": "cGxhbmV0czox",
                    "name": "Tatooine",
                    "planetMore": {
                      "imagesHeader": [
                        {
                          "_id": "5cb0f87c76bf833e6cefd259",
                          "filename": "/images/d73d50d1.jpeg",
                          "title": "Tatooine",
                          "description": "",
                          "__typename": "Image"
                        }
                      ],
                      "__typename": "PlanetMore"
                    },
                    "__typename": "Planet"
                  },
                  "species": {
                    "id": "c3BlY2llczox",
                    "name": "Human",
                    "speciesMore": null,
                    "__typename": "Species"
                  },
                  "personMore": {
                    "imagesHeader": [
                      {
                        "_id": "5cb0f84276bf833e6cefd255",
                        "filename": "/images/c0873e32.jpeg",
                        "title": "Luke Skywalker",
                        "description": "",
                        "__typename": "Image"
                      },
                      {
                        "_id": "5cb0f84976bf833e6cefd256",
                        "filename": "/images/4c841292.jpeg",
                        "title": "Luke Skywalker",
                        "description": "",
                        "__typename": "Image"
                      }
                    ],
                    "__typename": "PersonMore"
                  },
                  "starships": {
                    "starships": [
                      {
                        "id": "c3RhcnNoaXBzOjEy",
                        "name": "X-wing",
                        "starshipMore": {
                          "imagesHeader": [
                            {
                              "_id": "5cb0f89476bf833e6cefd25c",
                              "filename": "/images/c8347507.jpeg",
                              "title": "X-wing",
                              "description": "",
                              "__typename": "Image"
                            }
                          ],
                          "__typename": "StarshipMore"
                        },
                        "__typename": "Starship"
                      },
                      {
                        "id": "c3RhcnNoaXBzOjIy",
                        "name": "Imperial shuttle",
                        "starshipMore": {
                          "imagesHeader": [
                            {
                              "_id": "5cb0f8de76bf833e6cefd260",
                              "filename": "/images/6f7ffea2.jpeg",
                              "title": "Imperial shuttle",
                              "description": "",
                              "__typename": "Image"
                            }
                          ],
                          "__typename": "StarshipMore"
                        },
                        "__typename": "Starship"
                      }
                    ],
                    "__typename": "AllStarshipsResponse"
                  },
                  "vehicles": {
                    "vehicles": [
                      {
                        "id": "dmVoaWNsZXM6MTQ=",
                        "name": "Snowspeeder",
                        "vehicleMore": {
                          "imagesHeader": [
                            {
                              "_id": "5cb0f8e776bf833e6cefd262",
                              "filename": "/images/6d19561e.jpeg",
                              "title": "Snowspeeder",
                              "description": "",
                              "__typename": "Image"
                            }
                          ],
                          "__typename": "VehicleMore"
                        },
                        "__typename": "Vehicle"
                      },
                      {
                        "id": "dmVoaWNsZXM6MzA=",
                        "name": "Imperial Speeder Bike",
                        "vehicleMore": null,
                        "__typename": "Vehicle"
                      }
                    ],
                    "__typename": "AllVehiclesResponse"
                  },
                  "__typename": "Person"
                }
              }
        }
    }
]

test('Test RemoveImage',async (done) => {
    const component = renderer.create(
        <MockedProvider mocks={mocks} addTypename={true}>
            <Person id = 'cGVvcGxlOjE='/>
        </MockedProvider>,
    )

    await wait(0)
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    done()
})