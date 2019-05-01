import React, {Component, Fragment} from 'react'
import { Router } from '@reach/router'
import Persons from './component/persons/persons'
import Person from './component/persons/person'
import Planets from './component/planets/planets'
import Planet from './component/planets/planet'
import Speciess from './component/species/speciess'
import Species from './component/species/species'
import Starships from './component/starships/starships'
import Starship from './component/starships/starship'
import Vehicles from './component/vehicles/vehicles'
import Vehicle from './component/vehicles/vehicle'
import Nav from './component/nav'
import PageNotFound from './component/pageNotFound'
import './scss/app.sass'
import './scss/utils.sass'
import ModeUpdate from './component/ModeUpdate'
import SignIn from './component/sign/signin'
import { withApollo } from 'react-apollo'
import {withProperties} from './properties'
import Loading from './component/commun/loading'
import gql from 'graphql-tag'
import SignUp from './component/sign/signup'
import LeftMenu from './component/leftMenu'
import {compose} from './utils/utils'
import HandleError from './component/commun/handleError'
import {Query} from 'react-apollo'

const RELOAD_SIGN_IN = gql`
query ReloadSignIn{
    reloadSignIn{
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

class App extends Component {

    constructor(props){
        super(props)
        this.queryDidit = false
    }

    render(){
        return (
            <Query query = {RELOAD_SIGN_IN} fetchPolicy = "network-only"
                onCompleted = {data => {
                    if(this.queryDidit){
                        return
                    }
                    this.queryDidit = true
                    if(data.reloadSignIn.success){
                        this.props.properties.setPropertiesState(() => ({user: data.reloadSignIn.user}))
                    }
                }}
            >
            {
                ({loading, error}) => {
                    if (loading) return <div id = 'app_loading'><Loading /></div>
                    if (error) return <HandleError error = {error}/>
                        return (
                            <Fragment>
                                <Nav/>
                                <div id = 'container_sections'>
                                    <ModeUpdate/>
                                    <LeftMenu/>
                                    <section id = 'section'>
                                            <Router>
                                                <Persons path = '/persons'/>
                                                <Person path = '/person/:id'/>
                                                <Planets path = '/planets'/>
                                                <Planet path = '/planet/:id'/>
                                                <Speciess path = '/speciess'/>
                                                <Species path = '/species/:id'/>
                                                <Starships path = '/starships'/>
                                                <Starship path = '/starship/:id'/>
                                                <Vehicles path = '/vehicles'/>
                                                <Vehicle path = '/vehicle/:id'/>
                                                <SignIn path = '/sign-in'/>
                                                <SignUp path = '/sign-up'/>
                                                <PageNotFound default/>
                                            </Router>
                                    </section>
                                </div>
                        </Fragment>
                    )
                }
            }  
            </Query>
        )
    }
}

export default compose(withProperties, withApollo)(App)