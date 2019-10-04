import React, { Component } from 'react'
import { Tooltip, IconButton } from '@material-ui/core';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import ColorLensOutlinedIcon from '@material-ui/icons/ColorLensOutlined';
// const colorPalette = [{ name: "default", colorCode: "#FDFEFE" },
// { name: "Salmon", colorCode: "#FA8072" },
// { name: "Cyan", colorCode: "#00FFFF" },
// { name: "Tomato", colorCode: "#FF6347" },
// { name: "SaladGreen", colorCode: "#A1C935" },
// { name: "LightBlue", colorCode: "#ADD8E6" },
// { name: "PeachPuff", colorCode: "#FFDAB9" },
// { name: "Yellow", colorCode: "#FFFF00" },
// { name: "Lime", colorCode: "#00FF00" },
// { name: "Magenta", colorCode: "#FF00FF" },
// { name: "Silver", colorCode: "#C0C0C0" },
// { name: "DarkOrange", colorCode: "#FF8C00" },
// ]
const colorPalette = [{ name: "default", colorCode: "#FFFFFF" },
{ name: "Red", colorCode: "#F28B82" },
{ name: "Orange", colorCode: "#F7BCAC" },
{ name: "Yellow", colorCode: "#FCF475" },
{ name: "Green", colorCode: "#CCFF8F" },
{ name: "Teal", colorCode: "#A7FFEB" },
{ name: "Blue", colorCode: "#CBF0F8" },
{ name: "Dark Blue", colorCode: "#AECBFA" },
{ name: "Purple", colorCode: "#D7AEFB" },
{ name: "Pink", colorCode: "#FBCFE8" },
{ name: "Brown", colorCode: "#E6C9A8" },
{ name: "Gray", colorCode: "#E8EAED" }
]
export default class ColorPaletteComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchorEl: false
        }
    }
    handleChangeColor = (e) => {
        try {
            this.props.paletteProps(e.target.value, this.props.notesId)
        } catch (err) {
            console.log(err);
        }
    }
    handleOpenPopper(e) {
        this.setState({
            anchorEl: this.state.anchorEl ? false : e.target
        });
    };
    render() {
        const colorChange = colorPalette.map((key) => {
            return (
                <div>
                    <Tooltip title={key.name} style={{ zIndex: "1111" }} >
                        <IconButton style={{ backgroundColor: key.colorCode }}
                            value={key.colorCode}
                            onClick={this.handleChangeColor}>
                        </IconButton>
                    </Tooltip>
                </div>
            )
        })
        return (
            <div>
                <Tooltip title="Change Color" style={{ zIndex: "1111" }}>
                    <ColorLensOutlinedIcon
                        onClick={(e) => this.handleOpenPopper(e)}
                    />
                </Tooltip>
                <Popper open={this.state.anchorEl} anchorEl={this.state.anchorEl} 
                style={{ zIndex: "9999" }} placement="top-start">
                    <Paper>
                        <div className="color-map">  {colorChange}</div>
                    </Paper>
                </Popper>
            </div>
        )
    }
}