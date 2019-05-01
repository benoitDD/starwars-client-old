import React from 'react'
import ImagesLink from '../commun/imagesLink'
import {withTranslation} from 'react-i18next'

function SpeciesPerson({species, t}){
    let images 
    if(species){
        let image = {
            id: species.id,
            name: species.name,
        }
        if(species.speciesMore && species.speciesMore.imagesHeader && species.speciesMore.imagesHeader.length){
            const imgHeader = species.speciesMore.imagesHeader[0]
            image = {...image, filename: imgHeader.filename, title: imgHeader.title}
        }
        images = [image]
    }
    return <ImagesLink title = {t('Species')} type = 'species' images = {images}/>
}

export default withTranslation()(SpeciesPerson)