import React from "react";
import { Parts, assertNever } from "./types";

const Part: React.FC<Parts> = ( {  part } )=> {
    switch (part.name) {
      case "Fundamentals":
        return <div><p> {part.name} {part.description} </p></div>;
      case "Using props to pass data":
        return <div><p> {part.name} {part.groupProjectCount} </p></div>;
      case "Deeper type usage":
        return <div><p> {part.name} {part.description}  {part.exerciseSubmissionLink}</p></div>;
      case "More Finnish goodness":
        return <div><p> {part.name} {part.description}  {part.exerciseSubmissionLink}</p></div>;
      default:
        return assertNever(part);
    }
};

export {Part}
