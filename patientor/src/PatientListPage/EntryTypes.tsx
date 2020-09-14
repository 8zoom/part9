import React from "react";
import { Entry , HealthCheckEntry as HealthProps } from "../types";
import { Icon } from "semantic-ui-react";

interface Props {
  entry: Entry;
}

export const HospitalEntry:  React.FC<{entry: Entry}> = ({entry}) => {
    return(
        <div>
            <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{entry.date}</span>
            <Icon name={'h square'}  size={'big'}/>
            <br/>
            {entry.description}
            <br/> <br/>
        </div>
    );
};


export const HealthCheckEntry:  React.FC<{entry: HealthProps}> = ({entry}) => {
    type SemanticCOLORS = 'red' | 'orange' | 'yellow' | 'olive' | 'green' | 'teal' | 'blue' | 'violet' | 'purple' | 'pink' | 'brown' | 'grey' | 'black';
    const mycolors: SemanticCOLORS[] = [ 'green', 'yellow', 'orange', 'red'];

    return(
        <div>
            <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{entry.date}</span>
            <Icon name={'user md'}  size={'big'}/>
            <br/>
            <Icon name={'heart'} color={mycolors[entry.healthCheckRating]} size={'large'}/>
            {entry.description}
            <br/> <br/>
        </div>
    );
};

export const OccupationalHealthcareEntry= ({entry}: Props) => {
    return(
        <div>
            <span style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{entry.date}</span>
            <Icon name={'heartbeat'}  size={'big'}/>
            <br/>
            {entry.description}
            <br/> <br/>
        </div>
    );
};