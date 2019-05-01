import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Link } from '@reach/router'
import '../../scss/vehicles.sass'
import Pagination from '../commun/pagination'
import {createQuery_get_all_object} from '../../utils/utils'

const FRAGMENT_ITEM_VEHICLE = gql`
    fragment ItemVehicleFragment on Vehicle {
        id
        name
    }
`

const GET_VEHICLES = createQuery_get_all_object('allVehicles', 'vehicles', FRAGMENT_ITEM_VEHICLE, 'ItemVehicleFragment')

class Vehicles extends Component {

    render(){
        return (
            <div id = 'vehicles'>
                <Pagination unique = 'vehicles' query = {GET_VEHICLES} nameQuery = 'allVehicles' nameObject = 'vehicles'>
                    {
                        vehicle => (
                            <Link className = 'vehicles_item' to = {`/vehicle/${vehicle.id}`}>
                                {vehicle.name}
                            </Link>
                        )
                    }
                </Pagination>
            </div>
        )
    }
}

export default Vehicles