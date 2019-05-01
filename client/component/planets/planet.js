import React, {Component, Fragment} from 'react'
import { Query } from 'react-apollo'
import '../../scss/planet.sass'
import Properties from '../commun/properties'
import AddImage from '../commun/addImage'
import {GET_PLANET, getProperties} from './commun'
import {getValue} from '../../utils/utils'
import Images from '../commun/images'
import Loading from '../commun/loading'
import ImagesLinkPerson from '../commun/ImagesLinkPerson'
import {withTranslation} from 'react-i18next'
import HandleError from '../commun/handleError'

class Planet extends Component {
    render(){
        return (
            <Fragment>
                <Query query = {GET_PLANET} variables = {{id:this.props.id}} fetchPolicy = "network-only">
                    {
                        ({data, loading, error}) => {
                            if (loading) return <div id = 'planet_loading'><Loading /></div>
                            if (error) return <HandleError error = {error}/>
                            return (
                                <div className = 'planet'>
                                    <h1 className = 'planet_name'>{data.planet.name}</h1>
                                    <Images images = {getValue(data, 'planet.planetMore.imagesHeader')}
                                        idOwn = {data.planet.id} type = 'planet' />
                                    <AddImage id = {data.planet.id} GET_OBJECT = {GET_PLANET} typeObject = 'planet'/>
                                    <div id = 'planet_properties'>
                                        <div className = 'planet_properties_sections'>
                                            <div className = 'planet_properties_section'>
                                                <Properties properties = {getProperties(data.planet)} />
                                            </div>
                                        </div>
                                        <div className = 'planet_properties_sections'>
                                            <div className = 'planet_properties_section'>
                                                <ImagesLinkPerson persons = {data.planet.persons.persons} title = 'Persons' />
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

export default withTranslation()(Planet)