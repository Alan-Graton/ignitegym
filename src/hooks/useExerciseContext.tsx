import React from "react";

import { ExerciseContext, IExerciseContext } from "@/contexts/ExerciseContext";

export function useExerciseContext(): IExerciseContext {
  const context = React.useContext(ExerciseContext);

  return context;
}
