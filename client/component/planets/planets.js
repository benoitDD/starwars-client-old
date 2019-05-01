import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Link } from '@reach/router'
import '../../scss/planets.sass'
import Pagination from '../commun/pagination'
import {createQuery_get_all_object} from '../../utils/utils'

const FRAGMENT_ITEM_PLANET = gql`
    fragment ItemPlanetFragment on Planet {
        id
        name
    }
`

const GET_PLANETS = createQuery_get_all_object('allPlanets', 'planets', FRAGMENT_ITEM_PLANET, 'ItemPlanetFragment')

class Planets extends Component {

    render(){
        return (
            <div id = 'planets'>
                <Pagination unique = 'planets' query = {GET_PLANETS} nameQuery = 'allPlanets' nameObject = 'planets'>
                    {
                        planet => (
                            <Link className = 'planets_item' to = {`/planet/${planet.id}`}>
                                {planet.name}
                            </Link>
                        )
                    }
                </Pagination>
            </div>
        )
    }
}

export default Planets