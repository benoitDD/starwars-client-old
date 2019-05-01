import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Link } from '@reach/router'
import '../../scss/persons.sass'
import Pagination from '../commun/pagination'
import {createQuery_get_all_object} from '../../utils/utils'

const FRAGMENT_ITEM_PERSON = gql`
    fragment ItemPersonFragment on Person {
        id
        name
    }
`

const GET_PERSONS = createQuery_get_all_object('allPersons', 'persons', FRAGMENT_ITEM_PERSON, 'ItemPersonFragment')

class Persons extends Component {

    render(){
        return (
            <div id = 'persons'>
                <Pagination  unique = 'persons' query = {GET_PERSONS} nameQuery = 'allPersons' nameObject = 'persons'>
                    {
                        person => (
                            <Link className = 'persons_item' to = {`/person/${person.id}`}>
                                {person.name}
                            </Link>
                        )
                    }
                </Pagination>
            </div>
        )
    }
}

export default Persons