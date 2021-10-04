import {Component} from "react";
import type {IPersona} from "../interfaces/IPersona";
import {List} from "@material-ui/core";
import {PersonaListItem} from "./PersonaListItem";

export class PersonaList extends Component<{personas: IPersona[]}> {
    render() {
        const { personas } = this.props;

        return <List className="list-personas">
            {  personas && personas.length > 0 && personas.map((persona: IPersona, index) => {
                return (
                    <PersonaListItem key={index} persona={persona}/>
                )
            })}
        </List>;
    }
}