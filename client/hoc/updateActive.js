import React, {Component} from 'react'
import {ProviderProperties} from '../properties'

function updateActive(ComponentUpdateActive){
    return class UpdateActive extends Component {
        render(){
            return (
                <ProviderProperties.Consumer>
                    {
                        ({modeUpdate, user}) => {
                            if(!modeUpdate || !user){
                                return ''
                            }
                            return <ComponentUpdateActive {...this.props}/>
                        }
                    }
                </ProviderProperties.Consumer>
            )
        }
    }
}

export {updateActive}