export type Result =
  | "very severly underweight"
  | "severly underweight"
  | "underweight"
  | "healthy weight"
  | "overweight"
  | "moderately obese"
  | "severely obese"
  | "very severely obese";

interface BmiInput {
  value1: number;
  value2: number;
}

const parseArgumentsBmi = (args: Array<string>): BmiInput => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, mass: number): Result => {
  if(isNaN(height) || isNaN(mass))
    throw new Error("Provided values were not numbers!");
    
  const bmi = mass / ((height / 100) * (height / 100));
  if (bmi < 15) {
    return "very severly underweight";
  } else if (bmi > 15 && bmi <= 16) {
    return "severly underweight";
  } else if (bmi > 16 && bmi <= 18.5) {
    return "underweight";
  } else if (bmi > 18.5 && bmi <= 25) {
    return "healthy weight";
  } else if (bmi > 25 && bmi <= 30) {
    return "overweight";
  } else if (bmi > 30 && bmi <= 35) {
    return "moderately obese";
  } else if (bmi > 35 && bmi <= 40) {
    return "severely obese";
  } else {
    return "very severely obese";
  }
};

if(process.argv.length > 2) {
  try {
    const { value1, value2 } = parseArgumentsBmi (process.argv);
    console.log(calculateBmi(value1, value2));
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    console.log("Bmi-Calculator. Error, something went wrong: ", error.message);
  }
}