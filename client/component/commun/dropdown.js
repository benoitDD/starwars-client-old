import React, {Component} from 'react'
import '../../scss/dropdown.sass'
import PropTypes from 'prop-types'

/*
    props : {
        data: [
            {a:1, b:'ben'},
            {a:87, b:'jean'},
            ...
        ],
        renderData: (oneData) => jsx,
        renderHeader: (oneData) => jsx,
        header,
        displayDataChoose
        choose = oneData
    }
*/
class DropDown extends Component {
    constructor(props){
        super(props)
        this.state = {
            display: false,
            choose: props.choose
        }
    }

    toogleDisplay(){
        this.setState(state => ({display: !state.display}))
    }

    display(bool){
        this.setState({display: bool})
    }

    choose(object){
        this.setState({choose: object})
    }

    getData(){
        return !this.props.displayDataChoose && this.state.choose ?
            this.props.data.filter(o => o != this.state.choose)
            :
            this.props.data
    }

    render(){
        return (
            <div className = 'dropdown'
                    onClick = {() => this.toogleDisplay()}
                    onMouseEnter = {() => this.display(true)}
                    onMouseLeave = {() => this.display(false)}
                    >
                <header className = 'dropdown_header'>
                    {
                        this.state.choose && this.props.renderHeader ?
                            this.props.renderHeader(this.state.choose)
                            :
                            this.props.header
                    }
                </header>
                {
                    this.state.display && (
                        <div className = 'dropdown_body'>
                            {
                                this.getData().map((object, index) => (
                                    <div key = {index} className = 'dropdown_body_item'
                                        onClick = {() => this.choose(object)}>
                                        {this.props.renderData(object)}
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
        )
    }
}

DropDown.propTypes = {
    data: PropTypes.array.isRequired,
    renderData: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
    header: PropTypes.node,
    displayDataChoose: PropTypes.bool,
    choose: PropTypes.object
  }

export default DropDown