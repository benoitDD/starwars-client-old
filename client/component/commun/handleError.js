import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import {withProperties}  from '../../properties'
import {compose} from '../../utils/utils'

class HandleError extends Component {

    getGraphqlError(){
        const {error} = this.props 
        if(!error){
            return
        }
        if(error.graphQLErrors && error.graphQLErrors.length){
            return error.graphQLErrors[0]
        }else if(error.networkError && error.networkError.result && 
                error.networkError.result.errors && error.networkError.result.errors.length){
            return error.networkError.result.errors[0]
        }
        return
    }

    getCodeError(){
        const error = this.getGraphqlError()
        return error && error.extensions && error.extensions.code
    }

    componentDidMount(){
        const code = this.getCodeError()
        if(code === 'TOKEN_EXPIRED'){
            localStorage.setItem('token', '')
            this.props.properties.setPropertiesState(() => ({user: undefined}))
        }
    }

    handleCodeError(code, message){
        switch(code){
            case 'UNAUTHENTICATED':
                return <div>{this.props.t('You must identify')}</div>
            case 'INTERNAL_SERVER_ERROR':
                return <div>{this.props.t('A internal error is occured, wait a moment before reload')}</div>
            case 'BAD_USER_INPUT':
                return <div>{message}</div>
            case 'TOKEN_EXPIRED':
                return <div>{this.props.t('The connetion has expired, you must reconnect')}</div>
        }
        return <div>{this.props.t('The code error _code_ is unknown', {code})}</div>
    }

    handleGraphQLError(graphQLError){
        if(graphQLError.extensions && graphQLError.extensions.code){
            return this.handleCodeError(graphQLError.extensions.code, graphQLError.message)
        }
        return <div>{this.props.t('A error is occured:')}{' '}{graphQLError.message}</div>
    }

    render(){
        const {error} = this.props
        const graphqlError = this.getGraphqlError()
        if(graphqlError){
            return this.handleGraphQLError(graphqlError)
        }
        return <div>{this.props.t('Error unknow')}{error && error.message && ': ' + error.message}</div>
    }
}

export default compose(withProperties, withTranslation())(HandleError)