import {Component} from "react";
import axios from "axios";
import {Header} from "./Header";
import {Box, Button, IconButton, LinearProgress, ListItem, Typography} from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import type {IPersona} from "../interfaces/IPersona";
import {InstructionTemplate} from "./InstructionTemplate";
import {PersonaList} from "./PersonaList";

interface IState {
    name: string;
    isPerson: boolean;
    persona: IPersona;
    personas: IPersona[];
    selectedFile: any;
    isWaiting: boolean;
}

export class Container extends Component<any, IState>{
    constructor(props: any) {
        super(props);
        this.state = {
            name: 'juan',
            isPerson: true,
            persona: null,
            selectedFile: null,
            personas: [],
            isWaiting: false,
        }
    }

    onFileChange = event => {
           this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        this.setState({isWaiting: true});
        const formData = new FormData();
        formData.append(
            "file",
            this.state.selectedFile,
        );

        axios.post(`https://dondemiestas.achocallaromero.com:4443/verificarlista`, formData).then((res) => {
            this.setState({
                personas: res.data.data,
                selectedFile: null,
                isWaiting: false
            });
        }, () => {
            this.setState({
                isWaiting: false
            })
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
        const { personas, selectedFile, isWaiting } = this.state;
        const isThereData = personas && personas.length > 0;

        return <>
            <Header onClick={()=>this.cleanData()} personas={this.state.personas}/>
            <div className="marginTop"/>
            <>
                { !isThereData &&  <InstructionTemplate/>}
                { isWaiting &&
                    <Box paddingLeft={2} paddingRight={2}>
                        <LinearProgress/>
                    </Box>
                }
                { selectedFile &&
                    <ListItem>
                        <Button variant="contained" onClick={this.onFileUpload} fullWidth disabled={isWaiting}>Consultar</Button>
                    </ListItem>
                }
                { !isThereData &&
                    <label htmlFor="icon-button-file">
                        <input onChange={this.onFileChange} id="icon-button-file" type="file" className="d-none"
                               accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/>
                        <IconButton color="primary" aria-label="upload file" component="span">
                            <CloudUploadIcon className="icon-upload"/>
                        </IconButton><br/>
                        <Typography component="span" variant="body2" color="textSecondary">
                            {selectedFile ? this.state.selectedFile.name : "Seleccione un archivo Excel"}
                        </Typography>
                    </label>
                }

                { isThereData && <PersonaList personas={personas}/> }
            </>
        </>;
    }
}