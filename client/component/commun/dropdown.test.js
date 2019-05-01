import DropDown from './dropdown'
import React from 'react'
import renderer from 'react-test-renderer'

const data = [
    {
        name: 'toto',
        age: 21
    },
    {
        name: 'azed',
        age: 84
    },
    {
        name: 'kiki',
        age: 11
    }
]

test('Test Dropdown with 2 click', () => {
    const component = renderer.create(
      <DropDown data = {data} renderData = {person => <div>{`${person.name}, ${person.age} years old`}</div>}
      renderHeader = {person => <div>{person.name}</div>}
      displayDataChoose = {false}
      choose = {data[0]}
      />,
    )
    //Dropdown without list, with header is 'toto'
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    //header value
    expect(tree.children[0].children[0].children[0]).toBe('toto')
    
    
    //Dropdown with list, with header is 'toto'
    tree.props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    //header value
    expect(tree.children[0].children[0].children[0]).toBe('toto')

    //Dropdown without list, with header is 'azed'
    tree.children[1].children[0].props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    //header value
    expect(tree.children[0].children[0].children[0]).toBe('azed')
})

test('Test Dropdown with onMouseEnter-onMouseLeave', () => {
    const component = renderer.create(
      <DropDown data = {data} renderData = {person => <div>{`${person.name}, ${person.age} years old`}</div>}
      renderHeader = {person => <div>{person.name}</div>}
      displayDataChoose = {false}
      choose = {data[0]}
      />,
    )
    //Dropdown without list, with header is 'toto'
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    //header value
    expect(tree.children[0].children[0].children[0]).toBe('toto')
    
    
    //Dropdown with list, with header is 'toto'
    tree.props.onMouseEnter()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    //header value
    expect(tree.children[0].children[0].children[0]).toBe('toto')

    //Dropdown without list, with header is 'azed'
    tree.children[1].children[0].props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
    //header value
    expect(tree.children[0].children[0].children[0]).toBe('azed')
})