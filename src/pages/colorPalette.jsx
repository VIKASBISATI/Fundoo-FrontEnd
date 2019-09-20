import React, { Component } from 'react'
import ColorPalettePage from '../components/colorPaletteComponent'
export default class CreateNotes extends Component {
    render() {
        return (
            <ColorPalettePage props={this.props} />
        )
    }
}