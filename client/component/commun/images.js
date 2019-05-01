import React from 'react'
import '../../scss/images.sass'
import PropTypes from 'prop-types'
import RemoveImage from './removeImage'

function Images({images, idOwn, type}){
    if(!images || !images.length){
        return ''
    }
    return (
        <div className = 'images'>
            {
            images.map((image, index) => (
                <div className = 'images_item' key = {index}>
                    <RemoveImage idImage = {image._id} idExternal = {idOwn} type = {type}/>
                    <img className = 'images_item_image' src = {`${process.env.URI_API}${image.filename}`} 
                        alt = {image.title} title = {image.title}/>
                </div>
            ))
            }
        </div>
    )
}

Images.propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
        filename: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired
    })),
    idOwn: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}

export default Images