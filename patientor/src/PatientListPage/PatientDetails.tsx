import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { apiBaseUrl } from "../constants";
import { Icon, Button } from "semantic-ui-react";

import { useStateValue } from "../state";
import { Patient, Entry } from "../types";
import Diagnoses from "./Diagnoses";
import EntryDetails from "./EntryDetails";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientDetails: React.FC = () => {
  const [{ patients }, dispatch ] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [className, setClassName] = React.useState<string>('');

  const [error, setError] = React.useState<string | undefined>();

  const openHospitalModal = (): void => {
    setModalOpen(true);
    setClassName('Hospital');
  };
  const openHealthCheckModal = (): void => {
    setModalOpen(true);
    setClassName('HealthCheck');
  };
  const openOccupationalModal = (): void => {
    setModalOpen(true);
    setClassName('OccupationalHealthcare');
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    setClassName('');
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    console.log('values?', values);
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch({ type: "ADD_ENTRY", payload: newEntry});
      console.log("done", newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const patient = Object.values(patients).find((p: Patient) => p.id === id);
  if (!patient) return null;
  const entries = patient.entries;
  const showEntries = (entries: Entry[]) =>
    entries.length > 0 ? (
      entries.map((e: Entry) => <EntryDetails key={e.id} entry={e} />)
    ) : (
      <p>No entries for this patient</p>
    );

  let codes: string[] | null = [];
  for (const e of entries) {
    if ("diagnosisCodes" in e && e.diagnosisCodes)
      codes = [...e.diagnosisCodes];
  }

  codes = codes.length > 0 ? codes : null;

  return (
    <div>
      <h2>
        {" "}
        {patient.name}
        <Icon
          name={
            patient.gender === "male"
              ? "mars"
              : patient.gender === "female"
              ? "venus"
              : "neuter"
          }
        />
      </h2>
      ssn: {patient.ssn} <br /> occupation: {patient.occupation}
      <br /> <br />
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        className={className}
      />

     <Button onClick={() => openHospitalModal()} color={'google plus'}>add hospital entry</Button>
      <Button onClick={() => openHealthCheckModal()} color={'violet'}>add healthcheck entry</Button>
      <Button onClick={() => openOccupationalModal()} color={'teal'}>add occupational entry</Button>
      <h2>entries</h2>
      {showEntries(entries)}
      {codes && <Diagnoses codes={codes} />}
    </div>
  );
};

export default PatientDetails;
