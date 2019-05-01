import ImagesLink from './imagesLink'
import React from 'react'
import renderer from 'react-test-renderer'

const images = [
    {
        filename: '/images/planets/123456789.png',
        title: 'Coruscant capital',
        name: 'Coruscant',
        id: '123456789'
    },
    {
        filename: '/images/planets/753.png',
        title: 'Tatooine city',
        name: 'Tatooine',
        id: '753'
    }
]

test('Test ImagesLink', () => {
    const component = renderer.create(
      <ImagesLink title = 'The planets' type = 'planets' images = {images} />,
    )
    
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
})

test('Test ImagesLink without images', () => {
    const component = renderer.create(
      <ImagesLink title = 'The planets' type = 'planets' />,
    )
    
    let tree = component.toJSON()
    //Any images define (tree.children[0]: header)
    expect(tree.children[1].children[0]).toBe('Not define')
    expect(tree).toMatchSnapshot()
})