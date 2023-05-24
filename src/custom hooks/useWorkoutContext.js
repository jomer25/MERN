import { useContext } from "react";
import { WorkoutContext } from "../context/WorkoutContextProvider";

const useWorkoutContext = () => {
  const context = useContext(WorkoutContext)

  if(!context) {
    throw new Error('WorkoutContext must be used WorkoutContextProvider')
  }

  return context;
}
 
export default useWorkoutContext;