import React, { Component } from 'react'

class Button extends Component {

/**
 * Inner functionality methods
 */

    toRGB = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return [parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)]
    }

/**
 * General Methods
 */

    // Turns stuff on
    on = () => this.props.on(this.props.x, this.props.y)
    
    // Turns stuff off
    off = () => {
        if (this.keyState) {
            this.keyState = !this.keyState
            this.props.off(this.props.x, this.props.y)
        } // if
    } // off

    // Updates
    shouldUpdate = (nextProps) => this.props.color !== nextProps.color

    // Overlays a color
    colorOverlay = (hex) => {
        let [r, g, b] = this.
    }
}