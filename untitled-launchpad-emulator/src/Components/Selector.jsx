import React, { Component } from 'react'

const Selector = ({ className, name, options }) => (
    <div className={className}>
        <select name={name}>
            <option>Test</option>
        </select>
    </div>
)

export default Selector