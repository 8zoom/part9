import React from "react";
import { Part } from "./Part";
import {CourseParts} from "./types"

const Content: React.FC<CourseParts> = ({courseParts}) => 
    (
         <div>
            {courseParts.map((course ) =>  <Part key={course.name} part={course} />)}
        </div>
    )

export {Content}