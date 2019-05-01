import Homeworld from './homeworld'
import React from 'react'
import renderer from 'react-test-renderer'

const homeworld = {
    id: "cGxhbmV0czox",
    name: "Tatooine",
    planetMore: {
      imagesHeader: [
        {
          _id: "5cb0f87c76bf833e6cefd259",
          filename: "/images/d73d50d1.jpeg",
          title: "Tatooine",
          description: "",
          __typename: "Image"
        }
      ],
      __typename: "PlanetMore"
    },
    __typename: "Planet"
}

const homeworldWithoutImages = {
    id: "cGxhbmV0czox",
    name: "Tatooine",
    planetMore: {
      imagesHeader: [
      ],
      __typename: "PlanetMore"
    },
    __typename: "Planet"
}

test('Test Homeworld', () => {
    const component = renderer.create(
      <Homeworld homeworld = {homeworld} />,
    )
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

test('Test Homeworld without images', () => {
    const component = renderer.create(
      <Homeworld homeworld = {homeworldWithoutImages} />,
    )
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})