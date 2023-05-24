import { useState } from "react";
import useWorkoutContext from "../custom hooks/useWorkoutContext";
import moment from "moment";
import useAuthContext from "../custom hooks/useAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContext()
  
  const handleClickDelete = async () => {
    setLoading(true);

    try {
      const response = await fetch(`/api/workouts/${workout._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (response.ok) {
        dispatch({ type: 'DELETE_WORKOUT', payload: workout._id });
      }

      setError(response.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  
  return ( 
    <div>
      <h1>{workout.title}</h1>
      <p>Loads: {workout.loads}</p>
      <p>Reps: {workout.reps}</p>
      <p>Posted: {moment(workout.createdAt).fromNow()}</p>
      {error && <div>{error}</div>}
      <button onClick={handleClickDelete} disabled={loading}>{loading ? 'Please Wait...' : 'Delete Workout'}</button>
    </div>
   );
};
 
export default WorkoutDetails;
