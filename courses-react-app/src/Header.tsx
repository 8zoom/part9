import React from "react";
import {HeaderProps} from "./types"

const Header: React.FC<HeaderProps> = props =>
  <h1>{props.courseName}</h1>

export {Header}