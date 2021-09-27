import {Component} from "react";
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";

export class Header extends Component<{ onClick: () => void, onClick1: () => void }> {
    render() {
        return <header>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Venga el liquido
                        </Typography>
                        <Typography variant="h6" className="flex-grow">
                        </Typography>
                        <Button variant="contained" className="button" onClick={this.props.onClick}>De persona</Button>
                        &nbsp;
                        <Button variant="contained" className="button" onClick={this.props.onClick1}>De excel</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>;
    }
}