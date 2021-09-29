import {Component} from "react";
import axios from "axios";
import {Header} from "./Header";
import {Button, Divider, IconButton, List, ListItem, Typography} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import {PersonaListItem} from "./PersonaListItem";
import type {IPersona} from "../interfaces/IPersona";
import {InstructionTemplate} from "./InstructionTemplate";

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

    }

    render() {
        const { personas, selectedFile } = this.state;
        return <>
            <Header onClick={()=>this.cleanData()} personas={this.state.personas}/>
            <div className="marginTop"/>
            <>
                { !(personas && personas.length > 0) &&
                    <>
                        <InstructionTemplate/>
                        <label htmlFor="icon-button-file">
                            <input onChange={this.onFileChange} id="icon-button-file" type="file" className="d-none"/>
                            <IconButton color="primary" aria-label="upload file" component="span">
                                <CloudUploadIcon className="icon-upload"/>
                            </IconButton><br/>
                            <Typography component="span" variant="body2" color="textSecondary">
                                {selectedFile ? this.state.selectedFile.name : "Seleccione un archivo Excel"}
                            </Typography>
                        </label>
                    </>
                }
                { selectedFile &&
                    <ListItem>
                        <Button variant="contained" onClick={this.onFileUpload} fullWidth>Consultar</Button>
                    </ListItem>
                }

                { personas && personas.length > 0 &&
                    <List className="list-personas">
                        {
                            personas && personas.length > 0 && personas.map((persona: IPersona, index) => {
                                return (
                                    <PersonaListItem key={index} persona={persona}/>
                                )
                            })}
                    </List>
                }
            </>
        </>;
    }
}