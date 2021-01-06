import React, { Component } from 'react'

class Button extends Component {
    state = {
        keyState: false,
    }

    // Turns stuff on
    on = () => this.props.on(this.props.x, this.props.y)
    
    // Turns stuff off
    off = () => {
        if (this.keyState) {
            this.keyState = !this.keyState
            this.props.off(this.props.x, this.props.y)
        }
    }

    // Updates
    shouldUpdate = (nextProps) => this.props.color !== nextProps.color

    render = () => (
        <div>
            <button onMouseDown={this.on} onTouchStart={this.on} className={this.props.class} style={
                {
                backgroundColor: this.props.color,
                }
            }>
                {/* <svg width='80' height='80'>
                    <path d='M75,80H5a5,5,0,0,1-5-5V5A5,5,0,0,1,5,0H62a8.33,8.33,0,0,1,5.12,2.12L77.88,12.88A8.33,8.33,0,0,1,80,18V75A5,5,0,0,1,75,80Z' fill={this.props.color} stroke='black' stoke-width='2px'/>
                </svg> */}
                {/* {this.props.x.toString() + ' ' + this.props.y.toString()} */}
            </button>
        </div>
    )
}

export default Button;