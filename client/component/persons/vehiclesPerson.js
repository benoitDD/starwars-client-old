import React from 'react'
import ImagesLink from '../commun/imagesLink'
import {withTranslation} from 'react-i18next'

function VehiclesPerson({vehicles, t}){
    let images
    if(vehicles && vehicles.length){
        images = vehicles.map(vehicle => {
            let image = {
                name: vehicle.name,
                id: vehicle.id,

            }
            if(vehicle.vehicleMore && vehicle.vehicleMore.imagesHeader && vehicle.vehicleMore.imagesHeader.length){
                const imgHeader = vehicle.vehicleMore.imagesHeader[0]
                image = {...image, filename: imgHeader.filename, title: imgHeader.title}
            }
            return image
        })
    }
    return <ImagesLink title = {t('Vehicles')} type = 'vehicle' images = {images} />
}

export default withTranslation()(VehiclesPerson)