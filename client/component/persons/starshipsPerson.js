import React from 'react'
import ImagesLink from '../commun/imagesLink'
import {withTranslation} from 'react-i18next'

function StarshipsPerson({starships, t}){
    let images
    if(starships && starships.length){
        images = starships.map(starship => {
            let image = {
                name: starship.name,
                id: starship.id,

            }
            if(starship.starshipMore && starship.starshipMore.imagesHeader && starship.starshipMore.imagesHeader.length){
                const imgHeader = starship.starshipMore.imagesHeader[0]
                image = {...image, filename: imgHeader.filename, title: imgHeader.title}
            }
            return image
        })
    }
    return <ImagesLink title = {t('Starships')} type = 'starship' images = {images} />
}

export default withTranslation()(StarshipsPerson)