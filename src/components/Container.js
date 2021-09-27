import {Component} from "react";
import axios from "axios";
import {Header} from "./Header";
import {
    Avatar,
    Button,
    Divider,
    IconButton, Input,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@material-ui/core";
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

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

    cleanData () {
        this.setState({
            selectedFile: null,
            personas:[]
        });
    }
    componentDidMount() {
        this.verVacunado();
    }

    render() {
        const { personas, selectedFile } = this.state;
        console.warn(personas);
        return <>
            <Header onClick={()=>this.cleanData()} onClick1={() => this.setIsPerson(false)} personas={this.state.personas}/>
            <div className="marginTop"/>
            <>
                { !(personas && personas.length > 0) &&
                    <>
                        <label htmlFor="icon-button-file">
                            <input onChange={this.onFileChange} id="icon-button-file" type="file" className="d-none"/>
                            <IconButton color="primary" aria-label="upload file" component="span">
                                <CloudUploadIcon className="icon-upload"/>
                            </IconButton><br/>
                            <Typography
                                component="span"
                                variant="body2"
                                color="textSecondary"
                            >
                                {selectedFile? this.state.selectedFile.name : "Seleccione un archivo Excel"}
                            </Typography>
                        </label>
                    </>
                }
                { selectedFile &&
                    <>
                        <br/>
                        <br/>
                        <Button variant="contained" onClick={this.onFileUpload}>
                            Consultar
                        </Button>
                    </>
                }

                { personas && personas.length > 0 &&
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
                                        primary={<span className="name-persona">{persona.nombre ? persona.nombre.toLowerCase() : 'Desconocido'}</span>}
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
                }
            </>
        </>;
    }
}