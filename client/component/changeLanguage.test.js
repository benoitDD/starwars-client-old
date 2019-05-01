import ChangeLanguage from './changeLanguage'
import React from 'react'
import renderer from 'react-test-renderer'

test('Test ChangeLanguage', () => {
    const component = renderer.create(
      <ChangeLanguage />,
    )

    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    //unwrap dropdown
    component.root.findByProps({className: 'dropdown'}).props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    expect(component.root.findByProps({className: 'dropdown_header'})
    .findByProps({className: 'changeLanguage_label'})
    .children[0]).toBe('French')

    //Choose language es and wrap dropdown
    component.root.findAllByProps({className: 'changeLanguage_langage'})
    .filter(node => node.props.onClick)[0]
    .props.onClick()
    component.root.findAllByProps({className: 'dropdown_body_item'})[0]
    .props.onClick()
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()

    expect(component.root.findByProps({className: 'dropdown_header'})
    .findByProps({className: 'changeLanguage_label'})
    .children[0]).toBe('Spanish')
})