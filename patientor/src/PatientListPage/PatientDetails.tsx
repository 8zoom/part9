import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import Diagnoses from "./Diagnoses";
import EntryDetails from "./EntryDetails";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients } ] = useStateValue();
  const patient = Object.values(patients).find((p: Patient) => p.id === id);

  if (!patient) return null;
  const entries = patient.entries;

  let codes: string[] | null= [];
  for (const e of entries ){
    if ('diagnosisCodes' in e && e.diagnosisCodes) codes = [...e.diagnosisCodes];
  }
  codes = codes.length > 0 ? codes : null;

  return (
    <div>
        <h2> {patient.name}
        <Icon name={patient.gender === 'male' ? 'mars' : (patient.gender ==='female' ?  'venus' : 'neuter') } />
        </h2>
        ssn: {patient.ssn} 
        <br/>
        occupation: {patient.occupation}

        <h2>entries</h2>
        {(entries.length > 0) ? 
        (
          entries.map((e: Entry) =>  
           <EntryDetails key={e.id} entry={e} />
          )
        ) :  <p>No entries for this patient</p> }

       {codes && <Diagnoses codes={codes} />}
    </div>
  );
};

export default PatientDetails;
