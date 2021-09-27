import {Component} from "react";
import axios from "axios";
import {Header} from "./Header";
import {Avatar, Button, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@material-ui/core";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

interface IPersona {
    ci: string;
    nombre: string;
    dosis: string;
    fechaVacunacion: string;
    fechaNacimiento: string;
    vacunado: string;
}

interface IState {
    name: string;
    isPerson: boolean;
    persona: IPersona;
    personas: IPersona[];
    selectedFile: any
}

export class Container extends Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'juan',
            isPerson: true,
            persona: null,
            selectedFile: null,
            personas: []
        }
    }

    onFileChange = event => {
           this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
        );

        axios.post(`https://dondemiestas.achocallaromero.com:4443/verificarlista`, formData).then((res) => {
            this.setState({
                personas: res.data.data,
                selectedFile: null
            });
        });
    };

    verVacunado () {
        const persona = {ci: "5721370", "fecha_nacimiento": '1988-01-06'}
        axios.post(`https://dondemiestas.achocallaromero.com:4443/mevacune`, persona )
            .then(res => {
                console.warn(res.data);
            })
    }

    setIsPerson (option: boolean) {
        this.setState({
            isPerson: option
        });
    }
    componentDidMount() {
        this.verVacunado();
    }

    render() {
        const { personas } = this.state;
        console.warn(personas);
        return <>
            <Header onClick={() => this.setIsPerson(true)} onClick1={() => this.setIsPerson(false)}/>
            <div className="marginTop">
                <input type="file" onChange={this.onFileChange}/>
                <br/>
                <Button variant="contained" onClick={this.onFileUpload}>
                    Consultar
                </Button>

                <List>
                    <Divider/>
                    {
                        personas && personas.length > 0 && personas.map((persona: IPersona, index) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start" button>
                                <ListItemAvatar>
                                    <Avatar className={persona.vacunado === 'si' ? 'vacunado': ''}>
                                        <VerifiedUserIcon/>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={persona.nombre ? persona.nombre : 'Desconocido'}
                                    secondary={
                                        <>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Dosís: {persona.dosis}
                                            </Typography>
                                            { " — " + persona.fechaVacunacion}
                                        </>
                                    }
                                />
                            </ListItem>
                            <Divider/>
                        </>
                    )
                })}
                </List>
                {
                    !(personas && personas.length > 0) &&
                    <div className="center-avatar">
                        <Avatar className="avatar-screen" src="/img/vengaelliquido.png"/>
                    </div>
                }
            </div>
        </>;
    }
}