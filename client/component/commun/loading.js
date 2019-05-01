import React, {Component} from 'react'
import '../../scss/loading.sass'
import {displayAfter} from '../../hoc/displayAfter'
import PropTypes from 'prop-types'

class Loading extends Component {

    constructor(props){
        super(props)
        const {width = '100px', speed = '1s', color = 'red'} = props
        this.style = {
            borderColor: color,
            width: width,
            height: width,
            animationDuration: speed
    
        }
    }

    render(){
        return <span style = {this.style} className = 'spinner'></span>
    }
}

Loading.propTypes = {
    width: PropTypes.string,
    speed: PropTypes.string,
    color: PropTypes.string
}

export default displayAfter(Loading, 500)