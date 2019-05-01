import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Link } from '@reach/router'
import '../../scss/speciess.sass'
import Pagination from '../commun/pagination'
import {createQuery_get_all_object} from '../../utils/utils'

const FRAGMENT_ITEM_SPECIES = gql`
    fragment ItemSpeciesFragment on Species {
        id
        name
    }
`

const GET_SPECIESS = createQuery_get_all_object('allSpecies', 'species', FRAGMENT_ITEM_SPECIES, 'ItemSpeciesFragment')

class Speciess extends Component {

    render(){
        return (
            <div id = 'speciess'>
                <Pagination  unique = 'speciess' query = {GET_SPECIESS} nameQuery = 'allSpecies' nameObject = 'species'>
                    {
                        species => (
                            <Link className = 'speciess_item' to = {`/species/${species.id}`}>
                                {species.name}
                            </Link>
                        )
                    }
                </Pagination>
            </div>
        )
    }
}

export default Speciess