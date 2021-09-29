import {Component} from "react";
import {AppBar, Avatar, Box, Button, Toolbar, Typography} from "@material-ui/core";

export class Header extends Component<{ onClick: () => void, personas: any }> {
    render() {
        return <header>
            <Box className="flex-grow">
                <AppBar className="align-left" position="fixed" color="default" elevation={0}>
                    <Toolbar>
                        <Avatar variant="rounded" src="/img/vengaelliquido.png"/>
                        <Typography variant="body1" component="div" className="flex-grow title">
                            &nbsp; Venga el líquido
                        </Typography>
                        {
                            this.props.personas && this.props.personas.length > 0 &&
                            <Button variant="contained" className="button" onClick={this.props.onClick}>Reiniciar</Button>
                        }
                    </Toolbar>
                </AppBar>
            </Box>
        </header>;
    }
}