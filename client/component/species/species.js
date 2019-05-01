import React, {Component, Fragment} from 'react'
import { Query } from 'react-apollo'
import '../../scss/species.sass'
import {GET_SPECIES, getProperties} from './commun'
import AddImage from '../commun/addImage'
import Properties from '../commun/properties'
import Images from '../commun/images'
import {getValue} from '../../utils/utils'
import Loading from '../commun/loading'
import Homeworld from '../commun/homeworld'
import ImagesLinkPerson from '../commun/ImagesLinkPerson'
import {withTranslation} from 'react-i18next'
import HandleError from '../commun/handleError'

class Species extends Component {

    render(){
        return (
            <Fragment>
                <Query query = {GET_SPECIES} variables = {{id:this.props.id}} fetchPolicy = "network-only">
                {
                    ({data, loading, error}) => {
                        if (loading) return <div id = 'species_loading'><Loading /></div>
                        if (error) return <HandleError error = {error}/>
                        return (
                            <div className = 'species'>
                                <h1 className = 'species_name'>{data.species.name}</h1>
                                <Images images = {getValue(data, 'species.speciesMore.imagesHeader')}
                                    idOwn = {data.species.id} type = 'species' />
                                <AddImage id = {data.species.id} typeObject = 'species'/>
                                <div id = 'species_properties'>
                                    <div className = 'species_properties_sections'>
                                        <div className = 'species_properties_section'>
                                            <Properties properties = {getProperties(data.species)} />
                                        </div>
                                    </div>
                                    <div className = 'species_properties_sections'>
                                        <div className = 'species_properties_section'>
                                            <Homeworld homeworld = {data.species.homeworld}/>
                                        </div>
                                        <div className = 'species_properties_section'>
                                            <ImagesLinkPerson persons = {data.species.persons.persons} title = 'Persons' />
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

export default withTranslation()(Species)