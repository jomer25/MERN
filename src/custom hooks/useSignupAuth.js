import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignupAuth = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { dispatch } = useAuthContext();

  const signup = async (email, password) => {
    setLoading(true);

    try {
      const response = await fetch('/api/users/singup', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const json = await response.json();

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(json));
        dispatch({ type: 'LOGIN', payload: json });
      }

      setError(json.error);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { signup, error, loading };
};
 
export default useSignupAuth;
