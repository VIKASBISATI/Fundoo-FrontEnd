import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import DeleteIcon from '@material-ui/icons/Delete';
export default class drawerComponent extends Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }
    handleToggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };
    render() {
        const contents = (

            <div>
                <List>
                    {['Notes', 'Reminders'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Edit Labels', 'Archive'].map((text, index) => (
                        <ListItem button key={text}
                        >
                            <ListItemIcon>{}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Archive', 'Bin'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>

            </div>
        );
        return (
            <div>
                <Drawer open={this.state.left} onClose={this.handleToggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.handleToggleDrawer('left', false)}
                        onKeyDown={this.handleToggleDrawer('left', false)}
                    >
                        {contents}
                    </div>
                </Drawer>
            </div>
        )
    }
}
