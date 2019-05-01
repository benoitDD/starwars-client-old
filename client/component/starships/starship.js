import React, {Component, Fragment} from 'react'
import { Query } from 'react-apollo'
import '../../scss/starship.sass'
import Properties from '../commun/properties'
import AddImage from '../commun/addImage'
import {GET_STARSHIP, getProperties} from './commun'
import {getValue} from '../../utils/utils'
import Images from '../commun/images'
import Loading from '../commun/loading'
import ImagesLinkPerson from '../commun/ImagesLinkPerson'
import {withTranslation} from 'react-i18next'
import HandleError from '../commun/handleError'

class Starship extends Component {
    render(){
        return (
            <Fragment>
                <Query query = {GET_STARSHIP} variables = {{id:this.props.id}} fetchPolicy = "network-only">
                    {
                        ({data, loading, error}) => {
                            if (loading) return <div id = 'starship_loading'><Loading /></div>
                            if (error) return <HandleError error = {error}/>
                            return (
                                <div className = 'starship'>
                                    <h1 className = 'starship_name'>{data.starship.name}</h1>
                                    <Images images = {getValue(data, 'starship.starshipMore.imagesHeader')}
                                        idOwn = {data.starship.id} type = 'starship' />
                                    <AddImage id = {data.starship.id} GET_OBJECT = {GET_STARSHIP} typeObject = 'starship'/>
                                    <div id = 'starship_properties'>
                                        <div className = 'starship_properties_sections'>
                                            <div className = 'starship_properties_section'>
                                                <Properties properties = {getProperties(data.starship)} />
                                            </div>
                                        </div>
                                        <div className = 'starship_properties_sections'>
                                            <div className = 'starship_properties_section'>
                                                <ImagesLinkPerson persons = {data.starship.persons.persons} title = 'Pilots' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default withTranslation()(Starship)