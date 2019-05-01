import React, {Component} from 'react'
import gql from 'graphql-tag'
import { withApollo } from 'react-apollo'
import '../../scss/signin.sass'
import {withProperties}  from '../../properties'
import {navigate} from "@reach/router"
import {withTranslation} from 'react-i18next'
import {compose} from '../../utils/utils'

const SIGN_IN = gql`
query SignIn($login:String!, $password:String!){
    signIn(login:$login, password:$password){
        success
        message
        details{
            key
            message
        }
        token
        user{
            login
        }
    }
}
`

class SignIn extends Component {

    constructor(props){
        super(props)
        this.state = {
            login: '',
            password: '',
            error: undefined
        }
    }

    onChangeValue(e){
        this.setState({[e.target.name]: e.target.value})
    }

    signIn(e){
        e.preventDefault()
        this.props.client.query({
            query: SIGN_IN,
            variables: {
                login: this.state.login,
                password: this.state.password
            },
            fetchPolicy: "network-only"
        })
        .then(response => {
            if(response.data.signIn.success){
                localStorage.setItem('token', response.data.signIn.token)
                this.props.properties.setPropertiesState(() => ({user: response.data.signIn.user}))
                navigate('/')
            }else{
                this.setState({error: response.data.signIn.message})
            }
        })
    }

    render(){
        const {t} = this.props
        return (
            <div id = 'signin'>
                <form id = 'signin_form'>
                    {
                        this.props.location && this.props.location.state && this.props.location.state.message
                        && (
                            <p id = 'signin_message_outside'>{t(this.props.location.state.message)}</p>
                        )
                    }
                    <h1>{t('SIGN IN')}</h1>
                    <div>
                        <label htmlFor = 'signin_login'>{t('Login')}</label>
                        <input id = 'signin_login' type = 'text' value = {this.state.login} 
                            placeholder = {t('Your login')}
                            name = 'login' onChange = {e => this.onChangeValue(e)} />
                    </div>
                    <div>
                        <label htmlFor = 'signin_password'>{t('Password')}</label>
                        <input id = 'signin_password' type = 'password' value = {this.state.password} 
                            placeholder = {t('Your password')} 
                            name = 'password' onChange = {e => this.onChangeValue(e)} />
                    </div>
                    <div id = 'signin_button'>
                        <button type = 'submit' onClick = {(e) => this.signIn(e)}>{t('Connect')}</button>
                    </div>
                    {
                        this.state.error && (
                            <div id = 'signin_error'>
                                {this.state.error}
                            </div>
                        )
                    }
                </form>
            </div>
        )
    }
}

export default compose(withProperties, withApollo, withTranslation())(SignIn)