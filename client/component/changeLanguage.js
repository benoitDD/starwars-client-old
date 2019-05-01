import React, {Component} from 'react'
import {withTranslation} from 'react-i18next'
import es from '../images/es.png'
import en from '../images/en.png'
import fr from '../images/fr.png'
import '../scss/changeLanguage.sass'
import Dropdown from './commun/dropdown'

const languages = [
    {
        code: 'es',
        image: es,
        label: 'Spanish'
    },
    {
        code: 'en',
        image: en,
        label: 'English'
    },
    {
        code: 'fr',
        image: fr,
        label: 'French'
    }
]

class ChangeLanguage extends Component {

    languageCurrent(){
        const languagesMatch = languages.filter(lng => lng.code === this.props.i18n.language)
        const language = languagesMatch.length ? languagesMatch[0] 
            : 
            languages.filter(lng => lng.code === this.props.i18n.options.fallbackLng[0])[0]
        
        return language
    }

    constructor(props){
        super(props)
        this.state = {
            language: this.languageCurrent()
        }
    }

    render(){
        return (
            <div className = 'changeLanguage'>
                <Dropdown data = {languages}
                choose = {this.state.language}
                renderData = {language => (
                    <div className = 'changeLanguage_langage'
                        onClick = {() => this.props.i18n.changeLanguage(language.code)}
                    >
                        <img src = {language.image} alt = {language.code}/>
                        <span className = 'changeLanguage_label'>{this.props.t(language.label)}</span>
                    </div>
                )}
                
                renderHeader = {language => (
                    <div className = 'changeLanguage_langage'>
                        <img src = {language.image} alt = {language.code}/>
                        <span className = 'changeLanguage_label'>{this.props.t(language.label)}</span>
                    </div>
                )}
                displayDataChoose = {false}
                />
            </div>
        )
    }
}

export default withTranslation()(ChangeLanguage)