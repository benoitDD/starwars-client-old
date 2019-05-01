import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Link } from '@reach/router'
import '../../scss/starships.sass'
import Pagination from '../commun/pagination'
import {createQuery_get_all_object} from '../../utils/utils'

const FRAGMENT_ITEM_STARSHIP = gql`
    fragment ItemStarshipFragment on Starship {
        id
        name
    }
`

const GET_STARSHIPS = createQuery_get_all_object('allStarships', 'starships', FRAGMENT_ITEM_STARSHIP, 'ItemStarshipFragment')

class Starships extends Component {

    render(){
        return (
            <div id = 'starships'>
                <Pagination unique = 'starships' query = {GET_STARSHIPS} nameQuery = 'allStarships' nameObject = 'starships'>
                    {
                        starship => (
                            <Link className = 'starships_item' to = {`/starship/${starship.id}`}>
                                {starship.name}
                            </Link>
                        )
                    }
                </Pagination>
            </div>
        )
    }
}

export default Starships