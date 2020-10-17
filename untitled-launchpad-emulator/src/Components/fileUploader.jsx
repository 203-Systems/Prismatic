import React, { Component } from 'react'
import axios from 'axios'

class FileUploader extends Component {
    state = { chosenFile: null }

    onFileChange = (event) => this.setState({ selectedFile: event.target.files[0] })

    render = () => {}
}

export default FileUploader