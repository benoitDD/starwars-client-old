import React, {Component} from 'react'

const ProviderProperties = React.createContext()

class Properties extends Component {
  constructor(props){
    super(props)
    this.state = {
      modeUpdate: true,
      user: undefined,
      displayLeftMenu: true,
      isMediumScreen: false
    }
    this.object = {}
  }

  setPropertiesState = func => {
    this.setState(func)
  }

  get = key => {
    return this.object[key]
  }

  set = (key, value) => {
    this.object[key] = value
  }

  render(){
    return (
      <ProviderProperties.Provider value = {{...this.state, get: this.get, 
          set: this.set, setPropertiesState: this.setPropertiesState}}>
        {
          this.props.children
        }
      </ProviderProperties.Provider>
    )
  }
}

function withProperties(ComponentToAddProperties){
  return class ComponentWithProperties extends Component {
    render(){
      return (
        <ProviderProperties.Consumer>
            {
                (properties) => {
                    return <ComponentToAddProperties {...this.props} properties = {properties} />
                }
            }
        </ProviderProperties.Consumer>
      )
    }
  }
}

export {Properties, ProviderProperties, withProperties}