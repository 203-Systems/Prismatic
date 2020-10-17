import React, { Component } from 'react'

class Button extends Component {

    // ===================================== Inner methods ===================================== //

    // Converts a CHAD HEX color to a beta RGB color
    toRGB = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
        return [parseInt(result[1], 16),
                parseInt(result[2], 16),
                parseInt(result[3], 16)]
    }

    // Converts the value of a given component to CHAD HEX
    componentToHex = (component) => {
        const hex = component.toString(16)
        return hex.length == 1 ? '0' + hex : hex
    }

    // Converts a beta RGB color to a CHAD HEX color
    toHEX = (r, g, b) => '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b)

    // ===================================== General Methods ===================================== //

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

    // Overlays a color
    colorOverlay = (hex) => {
        let [r, g, b] = this.toRGB(hex)
        let [r0, g0, b0] = this.toRGB(this.props.overlay)
        r = r * (255 - r0) / 255 + r0;
        g = g * (255 - g0) / 255 + g0;
        b = b * (255 - b0) / 255 + b0;
        return this.toHEX(r, g, b)
    }

    render = () => (
        <div className='button'>
            <Button onMouseDown={this.on} onTouchStart={this.on} className={this.props.class} style={
                {
                backgroundCOlor: this.colorOverlay(this.props.color)
                }
            }>
                <svg width='80' height='80'>
                    <path d='M75,80H5a5,5,0,0,1-5-5V5A5,5,0,0,1,5,0H62a8.33,8.33,0,0,1,5.12,2.12L77.88,12.88A8.33,8.33,0,0,1,80,18V75A5,5,0,0,1,75,80Z' fill={this.props.color} stroke='black' stoke-width='2px'/>
                </svg>
                {this.props.x.toString() + ' ' + this.props.y.toString()}
            </Button>
        </div>
    )
}

export default Button;