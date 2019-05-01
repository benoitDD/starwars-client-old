import React from 'react'
import ImagesLink from './imagesLink'
import {withTranslation} from 'react-i18next'

function ImagesLinkPerson({persons, title, t}){
    let images
    if(persons && persons.length){
        images = persons.map(person => {
            let image = {
                name: person.name,
                id: person.id,

            }
            if(person.personMore && person.personMore.imagesHeader && person.personMore.imagesHeader.length){
                const imgHeader = person.personMore.imagesHeader[0]
                image = {...image, filename: imgHeader.filename, title: imgHeader.title}
            }
            return image
        })
    }
    return <ImagesLink title = {t(title)} type = 'person' images = {images} />
}

export default withTranslation()(ImagesLinkPerson)