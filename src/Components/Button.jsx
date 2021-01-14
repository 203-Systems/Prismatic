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
        <div>
            <button onMouseDown={this.on} onTouchStart={this.on} 
                    onMouseUp={this.off} onMouseLeave={this.off} onTouchEnd={this.off} onTouchCancel={this.off}
                    className={this.props.class} style={
                {
                backgroundColor: this.props.color,
                }
            }>
            </button>
        </div>
    )
}

export default Button;