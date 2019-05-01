import HandleError from './handleError'
import React from 'react'
import renderer from 'react-test-renderer'

jest.mock('../../properties')

test('Test HandleError connection expired', () => {
    const component = renderer.create(
      <HandleError error = {{graphQLErrors: [{extensions: {code: 'TOKEN_EXPIRED'}}]}} />,
    )
    const toTree = component.toTree()
    expect(toTree.rendered.props.properties.setPropertiesState).toHaveBeenCalledTimes(1)
    
    let tree = component.toJSON()
    expect(tree.children[0]).toBe('The connetion has expired, you must reconnect')
    expect(tree).toMatchSnapshot()
})

test('Test HandleError bad user input', () => {
  const component = renderer.create(
    <HandleError error = {{graphQLErrors: [{message: 'The name must be fill', extensions: {code: 'BAD_USER_INPUT'}}]}} />,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree.children[0]).toBe('The name must be fill')
})

test('Test HandleError authentification', () => {
  const component = renderer.create(
    <HandleError error = {{graphQLErrors: [{extensions: {code: 'UNAUTHENTICATED'}}]}} />,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree.children[0]).toBe('You must identify')
})

test('Test HandleError code error unknow', () => {
  const component = renderer.create(
    <HandleError error = {{graphQLErrors: [{extensions: {code: 'UNKNOW'}}]}} />,
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
  expect(tree.children[0]).toBe('The code error _code_ is unknown')
})