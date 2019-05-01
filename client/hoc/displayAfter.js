import React, {Component} from 'react'

function displayAfter(ComponentToDisplayAfter, ms = 500){
    return class DisplayAfter extends Component {

        constructor(props){
            super(props)
            this.state = {
                display: false
            }
        }

        componentDidMount(){
            this.idTimeOut = setTimeout(() => {
                this.setState({display: true})
            },ms)
        }
    
        componentWillUnmount(){
            clearTimeout(this.idTimeOut)
        }

        render(){
            if(!this.state.display){
                return ''
            }
            return <ComponentToDisplayAfter {...this.props}/>
        }
    }
}

export {displayAfter}