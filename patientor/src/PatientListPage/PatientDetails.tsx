import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Icon, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import Diagnoses from "./Diagnoses";
import EntryDetails from "./EntryDetails";
import  AddEntryModal, {EntryFormValues} from '../AddEntryModal/AddEntryForm';

const PatientDetails: React.FC = () => {

  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const { id } = useParams<{ id: string }>();
  const patient = Object.values(patients).find((p: Patient) => p.id === id);

  if (!patient) return null;
  const entries = patient.entries;

  const showEntries = (entries: Entry []) => 
        (entries.length > 0) ? 
        (
          entries.map((e: Entry) =>  
           <EntryDetails key={e.id} entry={e} />
          )
        ) :  <p>No entries for this patient</p>;


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
        ssn: {patient.ssn} <br/> occupation: {patient.occupation}


        <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Patient</Button>

        <h2>entries</h2>
        {showEntries(entries)}
        {codes && <Diagnoses codes={codes} />}
    </div>
  );
};

export default PatientDetails;
