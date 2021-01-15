import React, { Component } from 'react'

class Button extends Component {
    state = {
        keyState: false,
    }

    // Turns stuff on
    on = () => 
    {   
        if (!this.keyState) {
            this.keyState = true;
            this.props.on(this.props.x, this.props.y)
        }
    }
    
    // Turns stuff off
    off = () => {
        if (this.keyState) {
            this.keyState = false;
            this.props.off(this.props.x, this.props.y)
        }
    }

    // Updates
    shouldUpdate = (nextProps) => this.props.color !== nextProps.color

    render = () => (
        (this.isTouchDevice()) ? 
        (<button className={this.props.class} style={{backgroundColor: this.props.color}} onTouchStart={this.on} onTouchEnd={this.off} onTouchCancel={this.off}/>) : 
        (<button className={this.props.class} style={{backgroundColor: this.props.color}} onMouseDown={this.on} onMouseUp={this.off} onMouseLeave={this.off}/>)
    )

    isTouchDevice() {
        return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
    }
}

export default Button;