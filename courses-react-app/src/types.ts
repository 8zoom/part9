export interface HeaderProps {
  courseName: string;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: "Fundamentals";
  description?: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: "Deeper type usage";
  description?: string;
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase {
  name: "More Finnish goodness";
  description?: string;
  exerciseSubmissionLink: string;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

/**
 * Helper function for exhaustive type checking
 */
export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export interface Parts {
  part: CoursePart;
}

export interface CourseParts {
  courseParts: CoursePart[];
}
