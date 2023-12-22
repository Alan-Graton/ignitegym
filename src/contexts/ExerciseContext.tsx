import React, { useState } from "react";

const DEFAULT_VALUE = {
  selectedExercise: null,
  setSelectedExercise: () => {},
};

export const ExerciseContext =
  React.createContext<IExerciseContext>(DEFAULT_VALUE);

export function ExerciseProvider({ children }: Props) {
  const [exercises, setExercises] = useState(undefined);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(
    DEFAULT_VALUE.selectedExercise
  );

  return (
    <ExerciseContext.Provider value={{ selectedExercise, setSelectedExercise }}>
      {children}
    </ExerciseContext.Provider>
  );
}

interface IExerciseContext {
  selectedExercise: string | null;
  setSelectedExercise: React.Dispatch<React.SetStateAction<string | null>>;
}

interface Props {
  children: React.ReactNode;
}
