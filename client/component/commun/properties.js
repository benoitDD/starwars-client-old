import React, {Fragment} from 'react'
import '../../scss/properties.sass'
import PropTypes from 'prop-types'
import {withTranslation} from 'react-i18next'

function displayValueAndUnit(value, unit){
    return(
        <Fragment>
            <span>{value}</span>
            {
                unit && <span className = 'attributes_unit'>{unit}</span>
            }
        </Fragment>
    )
}

function getValueOrUndefined(value, unit, notDefine){
    if(!value){
        return notDefine
    }
    if(Array.isArray(value)){
        if(!value.length){
            return notDefine
        }
        return value.map((v, index) => (<div key = {index} className = 'attribute_value_array'>{
            displayValueAndUnit(v, unit)
        }</div>))
    }else{
        return displayValueAndUnit(value, unit)
    }
}

/*
properties = [
    {
        label,
        value,
        unit,
        helper
    }
]
*/
function Properties({properties, t}){
    return (
        <div className = 'attributes_container'>
            <h2 className = 'attributes_title'>{t('Properties')}</h2>
            <ul className = 'attributes'>
                {
                    properties.map((property, index) => (
                        <li key = {index} title = {property.helper} className = {property.helper ? 'helper' : ''}>
                            <div className = 'attribute'>{t(property.label)}</div>
                            <div className = 'attribute_value'>
                                {getValueOrUndefined(property.value, property.unit, t('Not define'))}
                            </div>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

Properties.propTypes = {
    properties: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number,
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.arrayOf(PropTypes.number)]),
        unit: PropTypes.string,
        helper: PropTypes.string
    })).isRequired
}

export default withTranslation()(Properties)