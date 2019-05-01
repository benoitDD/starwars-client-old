import React, {Component} from 'react'
import { Query } from 'react-apollo'
import '../../scss/pagination.sass'
import {withProperties} from '../../properties'
import PropTypes from 'prop-types'
import Loading from './loading'
import {withTranslation} from 'react-i18next'
import HandleError from './handleError'
import {compose} from '../../utils/utils'

/*
props {
    unique: "persons" (for save the props (page, after, before...))
    query: GET_PERSONS
    nameQuery: String ("allPersons")
    nameObject: String ("persons")
    children: item => ...
}
*/
class Pagination extends Component {

    constructor(props){
        super(props)
        this.pageSize = 20
        this.unique = window.location.pathname.replace('/','-') + '-' + this.props.unique
        
    }

    changePage(next, prev, objects, page){
        let firstload = {}
        if(next){
            firstload.after = prev.endCursor
        }else{
            firstload.before = prev.startCursor
        }
        this.props.properties.set(this.unique, {
            startCursor: objects.startCursor,
            endCursor: objects.endCursor,
            page,
            firstload
        })
    }

    getfirstLoad(){
        return this.getProps('firstload') || {}
    }

    getProps(name, objects){
        const properties = this.props.properties.get(this.unique)
        
        return properties ? 
            properties[name]
            :
            objects ? objects[name] : undefined
    }

    getBefore(objects){
        return this.getProps('startCursor', objects)
    }

    getAfter(objects){
        return this.getProps('endCursor', objects)
    }

    getPage(){
        return this.getProps('page') || 1
    }

    nextPage = (data, fetchMore) => {
        const buttonIsDisabled = ((this.getPage() - 1) * this.pageSize) + data[this.props.nameQuery][this.props.nameObject].length >= data[this.props.nameQuery].totalCount
        return <button className = {buttonIsDisabled ? 'disabled' : ''}
        onClick = {() => {
            if(buttonIsDisabled){
                return
            }
            fetchMore({
                variables: {
                    after: this.getAfter(data[this.props.nameQuery]),
                    pageSize: this.pageSize
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if(!fetchMoreResult) return prev
                    this.changePage(true, prev[this.props.nameQuery], fetchMoreResult[this.props.nameQuery], this.getPage() + 1)
                    return fetchMoreResult
                }
            })
        }}>{this.props.t('Next')}</button>
    }

    previousPage = (data, fetchMore) => {
        return <button className = {this.getPage() === 1 ? 'disabled' : ''}
        onClick = {() => {
            if(this.getPage() === 1){
                return
            }
            fetchMore({
                variables: {
                    before: this.getBefore(data[this.props.nameQuery]),
                    after: undefined,
                    pageSize: this.pageSize
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if(!fetchMoreResult) return prev
                    this.changePage(false, prev[this.props.nameQuery], fetchMoreResult[this.props.nameQuery], this.getPage() - 1)
                    return fetchMoreResult
                }
            })
        }}>{this.props.t('Previous')}</button>
    }
    
    render(){
        return (
                <Query query = {this.props.query} variables = {{pageSize:this.pageSize, ...this.getfirstLoad()}} fetchPolicy = "network-only">
                    {
                        ({data, loading, error, fetchMore}) => {
                            if (loading) return <div className = 'pagination_loading'><Loading /></div>
                            if (error) return <HandleError error = {error}/>
                            return (
                                <div className = 'pagination'>
                                    <div className = 'pagination_header'>
                                        <div>{this.props.t('total')} : {data[this.props.nameQuery].totalCount}</div>
                                        <div>{this.props.t('page')} : {this.getPage()} / {Math.ceil(data[this.props.nameQuery].totalCount / this.pageSize)}</div>
                                        <div className = 'pagination_action'>
                                            {this.previousPage(data, fetchMore)}
                                            {this.nextPage(data, fetchMore)}
                                        </div>
                                    </div>
                                    <ul className = 'pagination_list'>
                                        {
                                            data[this.props.nameQuery][this.props.nameObject].map(object => (
                                                <li key = {object.id} className = 'pagination_list_item'>
                                                    {
                                                        this.props.children(object)
                                                    }
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            )
                        }
                    }
                    </Query>
        )
    }
}

Pagination.propTypes = {
    unique: PropTypes.string.isRequired,
    query: PropTypes.object.isRequired,
    nameQuery: PropTypes.string.isRequired,
    nameObject: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
}

export default compose(withProperties, withTranslation())(Pagination)