import {Component} from "react";
import {AppBar, Avatar, Box, Button, Toolbar, Typography} from "@material-ui/core";

export class Header extends Component<{ onClick: () => void, onClick1: () => void }> {
    render() {
        return <header>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="fixed" color="default">
                    <Toolbar>
                        <Avatar src="/img/vengaelliquido.png"/>
                        <Typography variant="h6" className="flex-grow">
                        </Typography>
                        <Typography variant="h5" component="div">
                            Venga el líquido
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>;
    }
}