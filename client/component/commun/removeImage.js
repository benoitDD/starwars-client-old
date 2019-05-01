import React from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import {RESPONSE_OBJECT, RESPONSE_OBJECT_FRAGMENTS} from './utils'
import PropTypes from 'prop-types'
import '../../scss/removeImage.sass'
import {updateActive} from '../../hoc/updateActive'

const REMOVE_IMAGE = gql`
  mutation RemoveImage($inputRemoveImage: InputRemoveImage!) {
    removeImage(inputRemoveImage: $inputRemoveImage){
      ${RESPONSE_OBJECT}
    }
  }

  ${RESPONSE_OBJECT_FRAGMENTS}
`

function RemoveImage({idImage, idExternal, type}){
    return (
      <Mutation mutation = {REMOVE_IMAGE} >
            {(removeImage, { data }) => {
              return (
                  <span className = 'remove_image' onClick = {() => {
                    removeImage({ variables: { 
                        inputRemoveImage: {
                            idExternal,
                            type: type,
                            idImage: idImage
                        }
                       } })
                  }}>&#10060;</span>
              )
            }}
      </Mutation>
    )
  }

  RemoveImage.propTypes = {
    idImage: PropTypes.string.isRequired,
    idExternal: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  }

  export default updateActive(RemoveImage)