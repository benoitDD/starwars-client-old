import React from 'react'
import '../../scss/imagesLink.sass'
import PropTypes from 'prop-types'
import { Link } from '@reach/router'
import {withTranslation} from 'react-i18next'

function ImagesLink({title, images, type, t}){
    return(
        <div className = 'images_container'>
            <h2 className = 'images_link_title'>{title}</h2>
            {
                images && images.length ? 
                    images.map(image => (
                        <Link key = {image.id} className = 'images_link_item' to = {`/${type}/${image.id}`}>
                            <span>
                                <span className = 'link images_link_item_name'>{image.name}</span>
                            </span>
                            {
                                image.filename ?
                                    <img src = {`${process.env.URI_API}${image.filename}`} alt = {image.title} />
                                :
                                    <span className = 'images_item_none'>{t('Any images define')}</span>
                            }
                        </Link>
                    ))
                :
                    <span className = 'images_link_none'>{t('Not define')}</span>
            }
        </div>
    )
}

ImagesLink.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
        filename: PropTypes.string,
        title: PropTypes.string,
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
    }))
}

export default withTranslation()(ImagesLink)