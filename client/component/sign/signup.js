import React, {Component} from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import '../../scss/signup.sass'
import {navigate} from "@reach/router"
import {withTranslation} from 'react-i18next'
  

const SIGN_UP = gql`
mutation SignUp($login:String!, $password:String!){
    signUp(login:$login, password:$password){
        success
        message
        details{
            key
            message
        }
        user{
            login
        }
    }
}
`
/*
    props : {
        signUp,
        data
    }
*/
class SignUpForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            login: '',
            password: ''
        }
    }

    onChangeValue(e){
        this.setState({[e.target.name]: e.target.value})
    }

    signIn(e){
        e.preventDefault()
        this.props.signUp({
            variables: {
                login: this.state.login,
                password: this.state.password
            }
        })
    }

    render(){
        return (
            <div id = 'signup'>
                <form id = 'signup_form'>
                    <h1>{this.props.t('SIGN UP')}</h1>
                    <div>
                        <label htmlFor = 'signup_login'>{this.props.t('Login')}</label>
                        <input id = 'signup_login' type = 'text' value = {this.state.login} 
                            placeholder = {this.props.t('Your login')}
                            name = 'login' onChange = {e => this.onChangeValue(e)} />
                    </div>
                    <div>
                        <label htmlFor = 'signup_password'>Password</label>
                        <input id = 'signup_password' type = 'password' value = {this.state.password} 
                            placeholder = {this.props.t('Your password')}
                            name = 'password' onChange = {e => this.onChangeValue(e)} />
                    </div>
                    <div id = 'signup_button'>
                        <button type = 'submit' onClick = {(e) => this.signIn(e)}>{this.props.t('Register')}</button>
                    </div>
                    {
                        this.props.response && !this.props.response.signUp.success && (
                            <div id = 'signup_error'>
                                {this.props.response.signUp.message}
                            </div>
                        )
                    }
                </form>
            </div>
        )
    }
}

const SignUpFormTranslate = withTranslation()(SignUpForm)

class SignUp extends Component {
    render(){
        return (
            <Mutation mutation = {SIGN_UP} onCompleted = {
                (data) => {
                    if(data.signUp.success){
                        navigate('/sign-in', {state: {message: 'Sign-up success, now sign-in !'}})
                    }
                }
            } >
                  {(signUp, { data }) => {
                    return <SignUpFormTranslate signUp = {signUp} response = {data} />
                  }}
            </Mutation>
          )
    }
}

export default withTranslation()(SignUp)