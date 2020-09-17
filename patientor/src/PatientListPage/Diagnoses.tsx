import React from "react";
import axios from "axios";
import { Diagnosis } from "../types";
import { apiBaseUrl } from "../constants";

type Props = {
  codes: string[];
};
const Diagnoses = ({ codes }: Props) => {
  const [diagArray, setDiagArray] = React.useState<Diagnosis[]>([]);

  React.useEffect(() => {
    (async () => {
      const results = await Promise.all(
        codes.map(async (code) => {
          try {
            const { data } = await axios.get(`${apiBaseUrl}/diagnoses/${code}`);
            return data;
          } catch (e) {
            console.log(e);
          }
        })
      );
      setDiagArray(results);
    })();
  }, [setDiagArray, codes]);

  return (
    <ul>
      {diagArray.map((d) => (
        <li key={d.code}>
          {d.code} {d.name}
        </li>
      ))}
    </ul>
  );
};

export default Diagnoses;
