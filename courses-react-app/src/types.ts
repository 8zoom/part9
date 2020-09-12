export interface HeaderProps {
    courseName: string;
  }

export interface CourseParts {
    courseParts: Course [];
}

export interface Course {
    name: string;
    exerciseCount: number;
}
