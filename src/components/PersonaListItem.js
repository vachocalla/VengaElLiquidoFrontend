import {Component} from "react";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import type {IPersona} from "../interfaces/IPersona";

export class PersonaListItem extends Component<{ persona: IPersona }> {
    primeraDosis = "1ra. DOSIS";

    render() {
        return <ListItem alignItems="flex-start" button divider>
            <ListItemAvatar>
                {
                    this.props.persona.nombre ?
                        <Avatar className={this.props.persona.vacunado === "si" ?
                            (this.props.persona.dosis === this.primeraDosis && this.props.persona.dosis2 === "" ? "vacunado-dosis1" : "vacunado-dosis2") : ""}>
                            <VerifiedUserIcon/>
                        </Avatar> :
                        <Avatar className="avatar-desconocido">
                            <HelpOutlineIcon className="icon-desconocido" fontSize="large"/>
                        </Avatar>
                }
            </ListItemAvatar>
            <ListItemText
                primary={<span
                    className="name-persona">{this.props.persona.nombre ? this.props.persona.nombre.toLowerCase() : "Desconocido: C.I." + this.props.persona.ci}</span>}
                secondary={
                    <>
                        <Typography component="span" variant="body2" color="textPrimary">
                            Dosís: {this.props.persona.dosis2 || this.props.persona.dosis}
                        </Typography>
                        {" — " + (this.props.persona.fechaVacunacion2 || this.props.persona.fechaVacunacion)}
                    </>
                }
            />
        </ListItem>;
    }
}