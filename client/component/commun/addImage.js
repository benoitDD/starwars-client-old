import React, {Component} from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import '../../scss/addImage.sass'
import {updateActive} from '../../hoc/updateActive'
import {mimeAccept} from '../../../commun/images'
import PropTypes from 'prop-types'
import {RESPONSE_OBJECT, RESPONSE_OBJECT_FRAGMENTS} from './utils'
import {withTranslation} from 'react-i18next'

const ADD_IMAGE = gql`
  mutation AddImage($inputAddImage: InputAddImage!) {
    addImage(inputAddImage: $inputAddImage){
      ${RESPONSE_OBJECT}
    }
  }

  ${RESPONSE_OBJECT_FRAGMENTS}
`

/*
props {
  addImage: addImage()
  id: object to update
  typeObject: "person" || "planet" ...
  response: data
}
*/
class FormAddImage extends Component{
  constructor(props){
    super(props)
    this.state = {
      title: '',
      description: '',
      filename: undefined,
      error: undefined
    }
    this.file = React.createRef()
  }

  onChangeValue = e => {
    this.setState({[e.target.name]:e.target.value})
  }

  submitForm(e){
    e.preventDefault()
    if(!this.file.current.files[0]){
      this.setState({error: 'A file must be fill'})
      return
    }
    const extension = mimeAccept(this.file.current.files[0].type)
    
    if(!extension[0]){
      this.setState({error: `extension [${extension[1]}] don't allow`})
      return
    }
    
    this.setState({error: undefined})
    this.props.addImage({ variables: { 
      inputAddImage: {
        idExternal: this.props.id,
        type: this.props.typeObject,
        imageHeader: {
          title: this.state.title,
          description: this.state.description,
          file: this.file.current.files[0]
        }
      }
     } })
  }

  displayResponse(){
    if(!this.props.response || !this.props.response.addImage){
      return ''
    }
    if(this.props.response.addImage.success){
      return <div className = 'add_image_success'>Image added</div>
    }else if(this.props.response.addImage.message){
      return <div className = 'add_image_fail'>Add image fail : {this.props.response.addImage.message}</div>
    }else{
      return ''
    }
  }

  displayErrorInterne(){
    return this.state.error ? 
    <div className = 'add_image_fail'>{this.props.t(this.state.error)}</div>
      : ''
  }

  displayError(name){
    if(this.state.error || !this.props.response || !this.props.response.addImage || !this.props.response.addImage.details
      || !this.props.response.addImage.details.length){
      return ''
    }

    const errors = this.props.response.addImage.details.filter(detail => (
      detail.key === name
    ))
    
    if(!errors || !errors.length){
      return ''
    }

    return (
      <div>
        {
          errors.map((detail, index) => {
            return <span key = {index} >{detail.message}</span>
          })
        }
      </div>
    )
  }

  render(){
    return (
      <form className = 'add_image_form'>
        <div className = 'add_image_inputs'>
          <div className = 'add_image_input'>
            <div>
              <input id = 'add_image_form_file' className = 'add_image_form_file' type = 'file' 
                ref = {this.file} accept="image/png, image/jpeg, image/jpg" 
                onChange = {() => {
                  const file = this.file.current.files[0]
                  if(file && file.name){
                    this.setState({filename: file.name})
                  }
                }} />
              <label className = 'add_image_form_file_label' htmlFor = 'add_image_form_file'>
                {
                  this.state.filename || this.props.t('Choose a image')
                }
              </label>
            </div>
            {this.displayError('file')}
          </div>
          <div className = 'add_image_input'>
            <input type = 'text' name = 'title' value = {this.state.title} onChange = {this.onChangeValue}
              placeholder = {this.props.t('title')}/>
            {this.displayError('title')}
          </div>
          <div className = 'add_image_input'>
            <input type = 'text' name = 'description' value = {this.state.description} onChange = {this.onChangeValue}
              placeholder = {this.props.t('description')}/>
            {this.displayError('description')}
          </div>
          <div className = 'add_image_input'>
            <button type = 'submit' onClick = {(e) => this.submitForm(e)}>{this.props.t('Add image')}</button>
          </div>
        </div>
        <div>
          {this.displayErrorInterne() || this.displayResponse()}
        </div>
      </form>
    )
  }
}

FormAddImage.propTypes = {
  addImage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  typeObject: PropTypes.string.isRequired,
  response: PropTypes.object
}

const FormAddImageTranslate = withTranslation()(FormAddImage)

function AddImage(props){
  return (
    <Mutation mutation = {ADD_IMAGE} >
          {(addImage, { data }) => {
            return <FormAddImageTranslate addImage={addImage} id = {props.id} typeObject = {props.typeObject} response = {data} />
          }}
    </Mutation>
  )
}

AddImage.propTypes = {
  id: PropTypes.string.isRequired,
  typeObject: PropTypes.string.isRequired
}

export default updateActive(AddImage)