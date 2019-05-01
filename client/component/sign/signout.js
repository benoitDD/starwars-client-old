import React, {Component} from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import '../../scss/signout.sass'
import {withProperties}  from '../../properties'
import {navigate} from "@reach/router"
import {withTranslation} from 'react-i18next'
import {compose} from '../../utils/utils'

const SIGN_OUT = gql`
query SignOut{
    signOut{
        success
    }
}
`

class SignOut extends Component {

    render(){
        return (
            <button id = 'sign_out' onClick = {() =>{
                this.props.client.query({
                    query: SIGN_OUT,
                    fetchPolicy: "network-only"
                })
                .then(response => {
                    localStorage.setItem('token', '')
                    this.props.properties.setPropertiesState(() => ({user: undefined}))
                    navigate('/')
                })
            }}>
                <span>{this.props.t('Sign out')}</span>
            </button>
        )
    }
}

export default compose(withProperties, withApollo, withTranslation())(SignOut)