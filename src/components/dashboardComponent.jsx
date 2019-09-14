import React, { Component } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
const theme = createMuiTheme({
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                color: "black",
                backgroundColor: "white"
            }
        }
    }
})
export default class dashboardComponent extends Component {
    render() {
        return (
            <div>
                <MuiThemeProvider theme={theme}>
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant='h6'>
                                <h4>Fundoo</h4>
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </MuiThemeProvider>
            </div>
        )
    }
}
