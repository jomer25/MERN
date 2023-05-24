import { createContext, useReducer } from "react";

const workoutReducer = (state, action) => {
  switch(action.type) {
    case 'SET_WORKOUTS':
      return {
        workouts: action.payload
      }
    case 'CREATE_WORKOUT':
      return {
        workouts: [...state.workouts, action.payload]
      }
    case 'DELETE_WORKOUT':
      return {
        workouts: state.workouts.filter(workout => workout._id !== action.payload)
      }
    default:
      return state
  }
}

export const WorkoutContext = createContext()

const WorkoutContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, {
    workouts: []
  })
  return ( 
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
   );
}
 
export default WorkoutContextProvider;