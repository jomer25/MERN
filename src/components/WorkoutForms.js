import { useState } from "react";
import useWorkoutContext from "../custom hooks/useWorkoutContext";
import useAuthContext from "../custom hooks/useAuthContext";

const WorkoutForms = () => {
  const [title, setTitle] = useState('');
  const [loads, setLoads] = useState(0);
  const [reps, setReps] = useState(0);
  const { dispatch } = useWorkoutContext();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext()

  const handleClickAdd = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify({ title, loads, reps }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'CREATE_WORKOUT', payload: json });
        setTitle('');
        setLoads(0);
        setReps(0);
      }

      setError(json.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleClickAdd}>
        <h1>Workout Form</h1>
        <div>
          <label>Title:</label>
          <input
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Loads:</label>
          <input
            type="number"
            value={loads}
            onChange={(e) => setLoads(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(Number(e.target.value))}
          />
        </div>
        {error && <div>{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Please Wait...' : 'Add Workout'}</button>
      </form>
    </div>
  );
};

export default WorkoutForms;
