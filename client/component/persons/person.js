import React, {Component, Fragment} from 'react'
import { Query } from 'react-apollo'
import '../../scss/person.sass'
import {GET_PERSON, getProperties} from './commun'
import AddImage from '../commun/addImage'
import Properties from '../commun/properties'
import Images from '../commun/images'
import {getValue} from '../../utils/utils'
import Loading from '../commun/loading'
import Homeworld from '../commun/homeworld'
import StarshipsPerson from './starshipsPerson'
import VehiclesPerson from './vehiclesPerson'
import SpeciesPerson from './speciesPerson'
import {withTranslation} from 'react-i18next'
import HandleError from '../commun/handleError'

class Person extends Component {

    render(){
        return (
            <Fragment>
                <Query query = {GET_PERSON} variables = {{id:this.props.id}} fetchPolicy = "network-only">
                {
                    ({data, loading, error}) => {
                        if (loading) return <div id = 'person_loading'><Loading /></div>
                        if (error) return <HandleError error = {error}/>
                        return (
                            <div className = 'person'>
                                <h1 className = 'person_name'>{data.person.name}</h1>
                                <Images images = {getValue(data, 'person.personMore.imagesHeader')} 
                                    idOwn = {data.person.id} type = 'person' />
                                <AddImage id = {data.person.id} typeObject = 'person'/>
                                <div id = 'person_properties'>
                                    <div className = 'person_properties_sections'>
                                        <div className = 'person_properties_section'>
                                            <Properties properties = {getProperties(data.person)} />
                                        </div>
                                        <div className = 'person_properties_section'>
                                            <SpeciesPerson species = {data.person.species} />
                                        </div>
                                        <div className = 'person_properties_section'>
                                            <VehiclesPerson vehicles = {data.person.vehicles.vehicles} />
                                        </div>
                                    </div>
                                    <div className = 'person_properties_sections'>
                                        <div className = 'person_properties_section'>
                                            <Homeworld homeworld = {data.person.homeworld}/>
                                        </div>
                                        <div className = 'person_properties_section'>
                                            <StarshipsPerson starships = {data.person.starships.starships} />
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

export default withTranslation()(Person)