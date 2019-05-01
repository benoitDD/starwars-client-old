import React, {Component, Fragment} from 'react'
import { Query } from 'react-apollo'
import '../../scss/vehicle.sass'
import Properties from '../commun/properties'
import AddImage from '../commun/addImage'
import {GET_VEHICLE, getProperties} from './commun'
import {getValue} from '../../utils/utils'
import Images from '../commun/images'
import Loading from '../commun/loading'
import ImagesLinkPerson from '../commun/ImagesLinkPerson'
import {withTranslation} from 'react-i18next'
import HandleError from '../commun/handleError'

class Vehicle extends Component {
    render(){
        return (
            <Fragment>
                <Query query = {GET_VEHICLE} variables = {{id:this.props.id}} fetchPolicy = "network-only">
                    {
                        ({data, loading, error}) => {
                            if (loading) return <div id = 'vehicle_loading'><Loading /></div>
                            if (error) return <HandleError error = {error}/>
                            return (
                                <div className = 'vehicle'>
                                    <h1 className = 'vehicle_name'>{data.vehicle.name}</h1>
                                    <Images images = {getValue(data, 'vehicle.vehicleMore.imagesHeader')} 
                                        idOwn = {data.vehicle.id} type = 'vehicle' />
                                    <AddImage id = {data.vehicle.id} GET_OBJECT = {GET_VEHICLE} typeObject = 'vehicle'/>
                                    <div id = 'vehicle_properties'>
                                        <div className = 'vehicle_properties_sections'>
                                            <div className = 'vehicle_properties_section'>
                                                <Properties properties = {getProperties(data.vehicle)} />
                                            </div>
                                        </div>
                                        <div className = 'vehicle_properties_sections'>
                                            <div className = 'vehicle_properties_section'>
                                                <ImagesLinkPerson persons = {data.vehicle.persons.persons} title = {this.props.t('Pilots')} />
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

export default withTranslation()(Vehicle)