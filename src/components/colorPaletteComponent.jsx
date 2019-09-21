import React, { Component } from 'react'
import { Tooltip, IconButton, Card } from '@material-ui/core'
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
{ name: "Salmon", colorCode: "#FA8072" },
{ name: "Cyan", colorCode: "#00FFFF" },
{ name: "Purple", colorCode: "#800080" },
{ name: "Teal", colorCode: "#008080" },
{ name: "LightBlue", colorCode: "#ADD8E6" },
{ name: "Purple", colorCode: "#800080" },
{ name: "Yellow", colorCode: "#FFFF00" },
{ name: "Lime", colorCode: "#00FF00" },
{ name: "Magenta", colorCode: "	#FF00FF" },
{ name: "Silver", colorCode: "#C0C0C0" },
{ name: "Brown", colorCode: "#A52A2A" },
]

export default class ColorPaletteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    handleOpenPopper = () => {
        this.setState({
            open: !this.state.open
        })
    }
    handleChangeColor = (e) => {
        try {
            this.props.paletteProps(e.target.value, this.props.notesId)
        } catch (err) {
            console.log(err);
        }
    }
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }
    render() {
        const colorChange = colorPalette.map((key) => {
            return (
                <div className="color-map">
                    <Tooltip title={key.name}>
                        <IconButton style={{ backgroundColor: key.colorCode}}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            <div>
                <Tooltip title="Change Color">
                    <ColorLensOutlinedIcon
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                {this.state.open ?
                    <div className="colorpalette-card">
                        <Card className="color-styles">
                            {colorChange}
                        </Card> 
                    </div>
                    : null}
            </div>
        )
    }
}