import { ExerciseDTO } from "@/dtos/ExercisesDTO";
import React, { useState } from "react";

export const ExerciseContext = React.createContext<IExerciseContext>(
  {} as IExerciseContext
);

export function ExerciseProvider({ children }: Props) {
  const [selectedExerciseID, setSelectedExerciseID] = useState<string | null>(
    null
  );
  const [selectedExerciseDetails, setSelectedExerciseDetails] =
    useState<ExerciseDTO | null>({} as ExerciseDTO);

  return (
    <ExerciseContext.Provider
      value={{
        selectedExerciseID,
        setSelectedExerciseID,
        selectedExerciseDetails,
        setSelectedExerciseDetails,
      }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

export interface IExerciseContext {
  selectedExerciseID: string | null;
  setSelectedExerciseID: React.Dispatch<React.SetStateAction<string | null>>;
  selectedExerciseDetails: ExerciseDTO | null;
  setSelectedExerciseDetails: React.Dispatch<
    React.SetStateAction<ExerciseDTO | null>
  >;
}

interface Props {
  children: React.ReactNode;
}
