import React, {Component, Fragment} from 'react'
import { Link } from '@reach/router'
import '../scss/nav.sass'
import {ProviderProperties} from '../properties'
import SignOut from './sign/signout'
import ChangeLanguage from './changeLanguage'
import {withTranslation} from 'react-i18next'
import Dropdown from './commun/dropdown'
import IconMenu from './commun/iconMenu'
import ToogleLeftMenu from './toogleLeftMenu'

class MyLink extends Component {
    render(){
        return <Link {...this.props}  
            getProps={({ isCurrent }) => {
                return isCurrent ? {className:  'active'} : {}
            }}/>
    }
}

class Nav extends Component {

    objets(){
        return [
            <MyLink key = {1} to="/persons">{this.props.t('Persons')}</MyLink>,
            <MyLink key = {2} to="/planets">{this.props.t('Planets')}</MyLink>,
            <MyLink key = {3} to="/speciess">{this.props.t('Species')}</MyLink>,
            <MyLink key = {4} to="/starships">{this.props.t('Starships')}</MyLink>,
            <MyLink key = {5} to="/vehicles">{this.props.t('Vehicles')}</MyLink>
        ]
    }

    render(){
        return (
            <ProviderProperties.Consumer>
                {
                    ({user}) => {
                        return (
                            <nav id = 'nav'>
                                <div id = 'brand'>
                                    <Link to = '/'>STAR WARS UNIVERS</Link>
                                </div>
                                <div>
                                    <div id = 'nav_objets'>
                                        {this.objets()}
                                    </div>
                                    <div id = 'nav_objets_dropdown'>
                                        <Dropdown
                                            data = {this.objets()}
                                            renderData = {data => (
                                                data
                                            )}
                                            header = {<IconMenu/>}
                                            displayDataChoose = {true}
                                            />
                                    </div>
                                </div>
                                <div>
                                    <ToogleLeftMenu/>
                                </div>
                                <div id = 'nav_right'>
                                    {
                                        user ? 
                                            <SignOut/>
                                            :
                                            <Fragment>
                                                <MyLink id = 'sign_in_link' to="/sign-in">
                                                    <span>{this.props.t('Sign in')}</span>
                                                </MyLink>
                                                <MyLink id = 'sign_up_link' to="/sign-up">
                                                    <span>{this.props.t('Sign up')}</span>
                                                </MyLink>
                                            </Fragment>
                                    }
                                    <ChangeLanguage/>
                                </div>
                            </nav>
                        )
                    }
                }
            </ProviderProperties.Consumer>
        )
    }
    
}

export default withTranslation()(Nav)

