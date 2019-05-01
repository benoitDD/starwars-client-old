import React, {Component} from 'react'
import withSizes from 'react-sizes'
import {withProperties} from '../properties'
import SearchImg from '../images/search.png'
import '../scss/toogleLeftMenu.sass'
import {compose} from '../utils/utils'

class LeftMenu extends Component {

    componentDidMount(){
        this.props.properties.setPropertiesState(() => ({
            isMediumScreen: this.props.isMediumScreen,
            displayLeftMenu: !this.props.isMediumScreen
        }))
    }

    componentDidUpdate(prevProps){
        if(!this.props.isMediumScreen && prevProps.isMediumScreen){
            this.props.properties.setPropertiesState(() => ({displayLeftMenu: true}))
        }else if(this.props.isMediumScreen && !prevProps.isMediumScreen){
            this.props.properties.setPropertiesState(() => ({displayLeftMenu: false}))
        }
        if(this.props.properties.isMediumScreen !== this.props.isMediumScreen){
            this.props.properties.setPropertiesState(() => ({isMediumScreen: this.props.isMediumScreen}))
        }
    }

    render(){
        if(!this.props.isMediumScreen){
            return ''
        }
        const {properties:{setPropertiesState}} = this.props
        return (
            <span id = 'toogle_left_menu'
                onClick = {() => setPropertiesState(
                    ({displayLeftMenu}) => 
                        ({displayLeftMenu: !displayLeftMenu})
                    )
                }
            >
                <img src = {SearchImg} alt = 'search_icon'/>
            </span>
        )
    }
}

const mapSizesToProps = ({ width }) => ({
    isMediumScreen: width <= 1100,
  }
)

export default compose(withProperties, withSizes(mapSizesToProps))(LeftMenu)