import React, {Component} from 'react'
import Search from './search'
import {withProperties} from '../properties'

class LeftMenu extends Component {

    render(){
        return (
            this.props.properties.displayLeftMenu ?
                <div id = 'left_menu'>
                    <Search/>
                </div>
                :
                ''
        )
    }
}

export default withProperties(LeftMenu)