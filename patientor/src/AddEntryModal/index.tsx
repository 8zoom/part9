import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import {AddHospitalEntryForm,AddHealthCheckEntryForm, AddOccupationalEntryForm,  EntryFormValues } from "./AddEntryForm";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  className: string;
}

const AddEntryModal = ({ onSubmit, modalOpen, onClose, error, className }: Props) => (
  <Modal className={className} open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add {className} entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      {className ==="Hospital" && 
      <AddHospitalEntryForm onSubmit={onSubmit} onCancel={onClose} entryTypeFromClassName={className} />
      }
      {className ==="HealthCheck" && 
      <AddHealthCheckEntryForm onSubmit={onSubmit} onCancel={onClose} entryTypeFromClassName={className} />
      }
      {className ==="OccupationalHealthcare" && 
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} entryTypeFromClassName={className} />
      }
    </Modal.Content>
  </Modal>
);

export default AddEntryModal ;
