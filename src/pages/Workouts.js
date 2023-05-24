import { useEffect, useState } from "react";
import useWorkoutContext from "../custom hooks/useWorkoutContext";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForms from "../components/WorkoutForms";
import useAuthContext from "../custom hooks/useAuthContext";

const Workouts = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext()

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);

      try {
        const response = await fetch('/api/workouts', {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }

        setError(json.error);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, [dispatch, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <WorkoutForms />
      {workouts?.map((workout) => <WorkoutDetails key={workout._id} workout={workout} />)}
    </div>
  );
};

export default Workouts;
