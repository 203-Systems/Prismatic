import React, { Component } from 'react'

class Navbar extends Component {

    render = () => (
        <nav className='navbar-container'>
            <form className='navbar-form' action={/*TODO*/}>
                <div className='navbar-input'>
                    <input type='file' id='file' onChange={this.props.onFileChange}/>
                </div>
                <div className='navbar-project'>
                    <span>Curent project: {this.props.name}</span>
                </div>
            </form>
        </nav>
    )
}