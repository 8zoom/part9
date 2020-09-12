import React from "react";
import {CourseParts} from "./types"


const Total: React.FC<CourseParts> = ( {  courseParts } )=> 
    (
        <p>
            Number of exercises{" "}
            {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
        </p>
    )

export {Total}
