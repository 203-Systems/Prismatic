import React, { Component } from 'react'

const Selector = ({ className, name, options }) => {
    <div className={className}>
        <select name={name}>
            {options.array.forEach(element => {
                return (
                    <option value={element.value}>{element.name}</option>
                )
            })}
        </select>
    </div>
}

export default Selector