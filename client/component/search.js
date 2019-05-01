import React, {Component} from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import '../scss/search.sass'
import { Link } from '@reach/router'
import {withTranslation} from 'react-i18next'
import {withProperties} from '../properties'
import {compose} from '../utils/utils'

const SEARCH = gql`
query Search($text:String!){
    search(text:$text){
        __typename
        ... on Person{
            id
            name
        }
        ... on Planet{
            id
            name
        }
        ... on Species{
            id
            name
        }
        ... on Starship{
            id
            name
        }
        ... on Vehicle{
            id
            name
        }
    }
}
`

class Search extends Component {

    constructor(props){
        super(props)
        this.state = {
            text: '',
            results: undefined,
            loading: false
        }
    }

    displayResultsType(results, title, type){
        return results.length ?
            <div key = {type} className = 'search_type'>
                <h1>{title}</h1>
                <ul>
                    {
                        results.map(result => 
                            (
                            <li key = {result.id}>
                                <Link onClick = {() => {
                                    this.props.properties.isMediumScreen &&
                                    this.props.properties.setPropertiesState(() => ({displayLeftMenu: false}))
                                }}
                                    className = 'link' to = {`/${type}/${result.id}`}>
                                {
                                    result.name
                                }
                                </Link>
                            </li>
                            )
                        )
                    }
                </ul>
            </div>
            :
            ''
    }

    sortResults(){
        return this.state.results.reduce((acc, object) => {
            switch(object.__typename){
                case 'Person':
                    acc.persons.push(object)
                    break
                case 'Planet':
                    acc.planets.push(object)
                    break
                case 'Species':
                    acc.species.push(object)
                    break
                case 'Starship':
                    acc.starships.push(object)
                    break
                case 'Vehicle':
                    acc.vehicles.push(object)
                    break
            }
            return acc
        }, {
            persons: [],
            planets: [],
            species: [],
            starships: [],
            vehicles: []
        })
    }

    displayResultsPerType(){
        const resultsSorted = this.sortResults()
        let res= []
        if(resultsSorted.persons.length){
            res.push(this.displayResultsType(resultsSorted.persons, this.props.t('Persons'), 'person'))
        }
        if(resultsSorted.planets.length){
            res.push(this.displayResultsType(resultsSorted.planets, this.props.t('Planets'), 'planet'))
        }
        if(resultsSorted.species.length){
            res.push(this.displayResultsType(resultsSorted.species, this.props.t('Species'), 'species'))
        }
        if(resultsSorted.starships.length){
            res.push(this.displayResultsType(resultsSorted.starships, this.props.t('Starships'), 'starship'))
        }
        if(resultsSorted.vehicles.length){
            res.push(this.displayResultsType(resultsSorted.vehicles, this.props.t('Vehicles'), 'vehicle'))
        }
        return res

    }

    displayResults(){
        return this.state.results.length ?
            this.displayResultsPerType()
            :
            this.props.t('Any results')
    }

    render(){
        return (
            <div id = 'search'>
                <form id = 'search_form'>
                    <input type = 'search' value = {this.state.text} placeholder = {this.props.t('Your search')} onChange = {
                        e => this.setState({text: e.target.value})
                    } />
                    <button type = 'submit' onClick = {(e) => this.search(e)}>{this.props.t('Search')}</button>
                </form>
                {
                    this.state.results && 
                        (
                            <div id = 'search_results'>
                            {
                                this.state.loading ?
                                    this.props.t('Loading')+ '...'
                                    :
                                    this.displayResults()
                            }
                            </div>
                        )
                }
                
            </div>
        )
    }

    search(e){
        e.preventDefault()
        this.setState({loading: true})
        this.props.client.query({
            query: SEARCH,
            variables: {text: this.state.text}
        })
        .then(response => {
            this.setState({results: response.data.search, loading: false})
        })
    }
}

export default compose(withProperties, withApollo, withTranslation())(Search)