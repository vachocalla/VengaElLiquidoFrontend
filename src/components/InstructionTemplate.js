import {Component} from "react";
import {Card, CardActionArea, CardContent, CardMedia, ListItem, Typography} from "@material-ui/core";

export class InstructionTemplate extends Component<{}> {
    render() {
        return <ListItem className="j-c-center">
            <Card>
                <CardActionArea>
                    <CardMedia className="card-background"
                               component="img"
                               height="140"
                               image="/img/template.png"
                               alt="plantilla"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Formato
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Debe incluir una cabecera con dos columnas -
                            Columna A: CI<br/>Columna B: Fecha Nacimiento
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </ListItem>;
    }
}