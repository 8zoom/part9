import React from "react";
import { useParams } from "react-router-dom";
import { Icon } from "semantic-ui-react";
import { useStateValue } from "../state";
import { Patient } from "../types";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients } ] = useStateValue();
  const patient = Object.values(patients).find((p: Patient) => p.id === id);

  if (!patient) return null;

  return (
    <div>
        <h2> {patient.name}
        <Icon name={patient.gender === 'male' ? 'mars' : (patient.gender ==='female' ?  'venus' : 'neuter') } />
        </h2>
        <p> date of birth: {patient.dateOfBirth}</p>
        <p> occupation: {patient.occupation}</p>
    </div>
  );
};

export default PatientDetails;
