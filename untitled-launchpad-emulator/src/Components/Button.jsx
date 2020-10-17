import React from 'react'

const Button = ({ eventHandler, text, id }) => (
    <button onClick={eventHandler} id={id}>
        <span>
            {text}
        </span>
    </button>
)
export default Button