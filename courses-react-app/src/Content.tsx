import React from "react";
import {CourseParts} from "./types"

const Content: React.FC<CourseParts> = ({courseParts}) => 
    (
         <div>
            {courseParts.map((course ) =>  <p key={course.name}> {course.name} {course.exerciseCount} </p>)}
        </div>
    )

export {Content}