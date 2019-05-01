import React from 'react'
import ImagesLink from './imagesLink'
import {withTranslation} from 'react-i18next'

function Homeworld({homeworld, t}){
    let images
    if(homeworld){
        let image = {
            id: homeworld.id,
            name: homeworld.name,
        }
        if(homeworld.planetMore && homeworld.planetMore.imagesHeader && homeworld.planetMore.imagesHeader.length){
            const imgHeader = homeworld.planetMore.imagesHeader[0]
            image = {...image, filename: imgHeader.filename, title: imgHeader.title}
        }
        images = [image]
    }
    return <ImagesLink title = {t('Homeworld')} type = {t('planet')} images = {images}/>
}

export default withTranslation()(Homeworld)