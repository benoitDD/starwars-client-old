import React from 'react'
import '../scss/modeUpdate.sass'
import {ProviderProperties} from '../properties'
import {withTranslation} from 'react-i18next'

function ButtonModeUpdate({t}){
    return (
        <ProviderProperties.Consumer>
            {
                ({setPropertiesState, modeUpdate, user}) => {
                    if(!user){
                        return ''
                    }
                    return (
                        <button onClick = {() => 
                            setPropertiesState(
                                ({modeUpdate}) => (
                                    {modeUpdate: !modeUpdate}
                                )
                            )
                            }
                                id = 'mode_update'
                        >
                            {modeUpdate ? t('Normal') : t('Update') }
                        </button>
                    )
                }
            }
        </ProviderProperties.Consumer>
    )
}

export default withTranslation()(ButtonModeUpdate)