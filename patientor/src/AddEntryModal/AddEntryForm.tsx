import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";
import { v1 as uuid } from "uuid";

import { TextField, DiagnosisSelection  } from "./FormField";
import { HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";
import { useStateValue } from "../state";
import { NumberField } from "../AddPatientModal/FormField";


export type EntryFormValues = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

interface HospitalProps {
  onSubmit: (values: HospitalEntry) => void;
  onCancel: () => void;
  entryTypeFromClassName: string;
}

interface HealthCheckProps {
  onSubmit: (values: HealthCheckEntry) => void;
  onCancel: () => void;
  entryTypeFromClassName: string;
}

interface OccupationalProps{
  onSubmit: (values: OccupationalHealthcareEntry) => void;
  onCancel: () => void;
  entryTypeFromClassName: string;
}
export const AddHospitalEntryForm: React.FC<HospitalProps> = (props) => {
const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={
        {
        id: uuid(),
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: {
          date: "",
          criteria: "",
        },
      }
    }
      onSubmit={props.onSubmit}

      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.discharge.date) {
          errors["dischargeDate"] = "Discharge date is required";
        }
        if (!values.discharge.criteria) {
          errors.dischargeCriteria = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 
            <Field
              label="Discharge Date"
              placeholder="YYYY-MM-DD"
              name="dischargeDate"
              component={TextField}
            />
            <Field
              label="Criteria"
              placeholder="Criteria"
              name="dischargeCriteria"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={props.onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};


export const AddHealthCheckEntryForm: React.FC<HealthCheckProps> = (props) => {

const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={
        {
        id: uuid(),
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0
      }
    }
      onSubmit={props.onSubmit}

      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 

            <Field
              label="healthCheckRating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={props.onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};




export const AddOccupationalEntryForm: React.FC<OccupationalProps> = (props) => {

const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={
        {
        id: uuid(),
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        employerName: '',
        sickLeave: {
          startDate: "",
          endDate: "",
        },
      }
    }
      onSubmit={props.onSubmit}

      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.employerName) {
          errors.employer= requiredError;
        }
        if (!values.sickLeave?.startDate) {
          errors["startDate"] = requiredError;
        }
        if (!values.sickLeave?.endDate) {
          errors.endDate= requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnoses)}
            /> 

           <Field
              label="Employer"
              placeholder="Employer"
              name="employer"
              component={TextField}
            />
           <Field
              label="Sick Leave Start Date"
              placeholder="YYYY-MM-DD"
              name="startDate"
              component={TextField}
            />
            <Field
              label="Sick Leave End Date"
              placeholder="YYYY-MM-DD"
              name="endDate"
              component={TextField}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={props.onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};