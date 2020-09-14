import React from "react";
import { Entry, assertNever } from "../types";
import { HospitalEntry, HealthCheckEntry, OccupationalHealthcareEntry } from "./EntryTypes";

interface Props {
  entry: Entry;
}
//const EntryDetails:  React.FC<{entry: Entry}> = ({entry}) => {
const EntryDetails = ({entry}: Props) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
