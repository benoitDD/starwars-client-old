import Properties from './properties'
import React from 'react'
import renderer from 'react-test-renderer'

const properties = [
    {
        label: 'name',
        value: 'Luke Skywalker'
    },
    {
        label: 'age',
        value: '25',
        unit: 'years old',
    },
    {
        label: 'home',
        value: 'Coruscant',
        helper: 'her actual home',
    }
]

test('Test Properties', () => {
    const component = renderer.create(
      <Properties  properties = {properties}/>,
    )
    
    let tree = component.toJSON()
    //tree.children[1] => liste
    expect(tree.children[1].children.length).toBe(3)
    expect(tree).toMatchSnapshot()
})