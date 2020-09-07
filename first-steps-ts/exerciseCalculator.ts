enum description {
  "not a great week; try harder next week!" = 1,
  "not too bad but could be better",
  "keep up the great work!",
}

interface exerciseEvaluation {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInput {
  target: number;
  log: Array<number>;
}
export const parseArgumentsExercise = (args: Array<string>): ExerciseInput => {
  if (args.length < 3) throw new Error("Exercise calculator. Not enough arguments");
  if (args.length > 30) throw new Error("Exercise calculator. Too many arguments");

  const checkForNaNInput = args
    .slice(2)
    .map(x => !isNaN(Number(x)))
    .some(x => x === false);

  if (!checkForNaNInput) {
    return {
      target: Number(args[2]),
      log: args.slice(3).map(x => Number(x)),
    };
  } else {
    throw new Error("Exercise calculator. Provided values were not numbers!");
  }
};

export const calculateExercises = (
  target: number,
  log: number[]
): exerciseEvaluation => {
  if (log.length < 1) throw new Error("No training day data was entered!");

  const average = log.reduce((acc, d) => acc + d) / log.length;
  const r = average / target;
  const rating = r < 0.6 ? 1 : r < 1 ? 2 : 3;
  return {
    periodLength: log.length,
    trainingDays: log.reduce((acc, d) => (d > 0 ? acc + 1 : acc + 0), 0),
    success: average >= target,
    rating,
    ratingDescription: description[rating],
    target,
    average,
  };
};

if (process.argv.length > 2) {
  try {
    const { target, log } = parseArgumentsExercise (process.argv);
    console.log(calculateExercises(target, log));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("Exercise-Calculator. Error, something went wrong: ", error.message);
  }
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
